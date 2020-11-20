import React, { Component } from 'react'

import Select from 'react-select'

import {
  Dialog,
  TextField,
  DialogTitle,
  DialogContent
} from '@material-ui/core'

import DateTimePicker from '../../../../Pickers/dateTimePicker'
import WysiwygEditor from '../../../../WYSIWYG/index'

import './AddEventDialog.scss'

class AddEventDialog extends Component {
  constructor(props) {
    super(props)
    this.state={
      name: '',
      startDate: new Date(),
      endDate: new Date(),
      model: ''
    }
  }

  handleNameChange = e => {
    this.setState({
      name: e.target.value
    })
  }

  handleDateChange = (date, type) => {
    switch (type) {
      case 0:
        this.setState({
          startDate: date
        })
        break
      case 1:
        this.setState({
          endDate: date
        })
        break
      default:
        break
    }
  }

  handleModelChange = (model) => {
    this.setState({
      model: model
    });
  }

  render () {
    const { open, handleClose } = this.props
    const { name, startDate, endDate } = this.state
    const users = [
      { label: 'Marisa', value: 'Marisa' },
      { label: 'Elton', value: 'Elton'}
    ]
    const repeatOptions = [
      { label: 'Don\'t repeat', value: '0'},
      { label: 'Every day', value: '1'},
      { label: 'Every week', value: '2'},
      { label: 'Every other week', value: '3'},
      { label: 'Every year', value: '4'},
      { label: 'Every weekday (Mon-Fri)', value: '5'},
      { label: 'Every month (on the 3rd Tuesday)', value: '6'},
      { label: 'Every 16th of the month', value: '7'},
    ]
    return (
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby='form-dialog-title'
          maxWidth={'sm'}
          fullWidth={true}
        >
          <DialogTitle id="form-dialog-title">Project Schedule</DialogTitle>
          <DialogContent>
            <div className="schedule-add__form">
              <header className="schedule-add-form__header">
                <TextField
                  id="standard-multiline-flexible"
                  label="Type the name of the event..."
                  multiline
                  rowsMax="4"
                  value={name}
                  onChange={this.handleNameChange}
                  margin="normal"
                  fullWidth
                />
              </header>
              <section className="schedule-add-form__detail">
                <div className="sa-form-field">
                  <label htmlFor="todos-assign" className="sa-form-field__label">
                    Starts
                  </label>
                  <div className="sa-form-field__content">
                    <DateTimePicker
                      selectedDateTime={startDate}
                      handleDateTimeChange={dateTime =>
                        this.handleDateChange(dateTime, 0)
                      }
                    />
                  </div>
                </div>
                <div className="sa-form-field">
                  <label htmlFor="todos-assign" className="sa-form-field__label">
                    Ends
                  </label>
                  <div className="sa-form-field__content">
                    <DateTimePicker
                      selectedDateTime={endDate}
                      handleDateTimeChange={dateTime =>
                        this.handleDateChange(dateTime, 1)
                      }
                    />
                  </div>
                </div>
                <div className="sa-form-field">
                  <label htmlFor="todos-assign" className="sa-form-field__label">
                    Repeat
                  </label>
                  <div className="sa-form-field__content">
                    <Select
                      options={repeatOptions}
                      className="basic-single"
                      classNamePrefix="select"
                      isSearchable={false}
                    />
                  </div>
                </div>
                <div className="sa-form-field">
                  <label htmlFor="todos-assign" className="sa-form-field__label">
                    With
                  </label>
                  <div className="sa-form-field__content">
                    <Select
                      isMulti
                      options={users}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      placeholder="Type names here..."
                    />
                  </div>
                </div>
                <div className="sa-form-field">
                  <WysiwygEditor
                    model={this.state.model}
                    onModelChange={this.handleModelChange}
                  />
                </div>
                <div className="sa-form-submit">
                  <input
                    className="sa-form-submit__input"
                    type='submit'
                    value='Post this event'
                  />
                  <button
                    className="sa-form-submit__cancel"
                    onClick={handleClose}
                  >
                    Cancel
                  </button>
                </div>
              </section>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    )
  }
}

export default AddEventDialog