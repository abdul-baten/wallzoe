import rp from "request-promise";
import config from "config";
import { isEmpty } from "lodash";
import { PostDocumentI } from "../../../models";
import { createReadStream } from "fs";

export default async (post: PostDocumentI) => {
  try {
    if (
      !isEmpty(post.textContent) &&
      post.files.imgUrls.length <= 0 &&
      post.files.vidUrls.length <= 0
    ) {
      // publish text only post
      const apiParams = {
        method: "POST",
        uri: `${config.get("facebook.APIEndpoint")}/${post.accountId}/feed`,
        qs: {
          access_token: post.accessToken,
          message: post.textContent
        }
      };

      await rp(apiParams);
    } else if (
      !isEmpty(post.files.imgUrls) &&
      post.files.imgUrls.length === 1
    ) {
      // publish post with one image
      const apiParams = {
        method: "POST",
        uri: `${config.get("facebook.APIEndpoint")}/${post.accountId}/photos`,
        qs: {
          access_token: post.accessToken,
          message: post.textContent,
          url: post.files.imgUrls[0],
          caption: post.textContent
        }
      };
      await rp(apiParams);
    } else if (!isEmpty(post.files.imgUrls) && post.files.imgUrls.length > 1) {
      const attachedMedias = await getSourceIDs(
        post.files.imgUrls,
        post.accountId,
        post.accessToken,
        "photos"
      );

      const publishPostApiParams = {
        method: "POST",
        uri: `${config.get("facebook.APIEndpoint")}/${post.accountId}/feed`,
        qs: {
          access_token: post.accessToken,
          message: post.textContent,
          ...attachedMedias
        }
      };
      await rp(publishPostApiParams);
    } else if (!isEmpty(post.files.vidUrls) && post.files.vidUrls.length > 1) {
      const attachedMedias = await getSourceIDs(
        post.files.vidUrls,
        post.accountId,
        post.accessToken,
        "videos"
      );

      console.log(attachedMedias);

      const apiParams = {
        method: "POST",
        uri: `${config.get("facebook.APIEndpoint")}/${post.accountId}/videos`,
        qs: {
          access_token: post.accessToken,
          // file_url: post.files.vidUrls,
          description: post.textContent,
          ...attachedMedias
        }
      };
      await rp(apiParams);
    }
    await post.updateOne({ isPublished: true }).exec();
  } catch (err) {
    console.log(err.message);
  }
};

async function getSourceIDs(
  sources: any,
  accountId: string,
  accessToken: string,
  sourceType: string
): Promise<any[]> {
  const publishIds: string[] = [];
  // publish post with multiple images

  // get photo ids for next step
  for (let file of sources) {
    const getIdApiParams = {
      method: "POST",
      uri: `${config.get("facebook.APIEndpoint")}/${accountId}/${sourceType}`,
      qs: {
        access_token: accessToken,
        // file_url: file,
        file_url: createReadStream(file),
        published: false
      }
    };
    const result = JSON.parse(await rp(getIdApiParams));

    publishIds.push(result.id);
  }

  // make an object for attached_media[0], attached_media[1]... etc
  const attachedMedia: any = {};

  publishIds.forEach((_, i) => {
    attachedMedia[`attached_media[${i}]`] = {
      media_fbid: publishIds[i].toString()
    };
  });

  return attachedMedia;
}
