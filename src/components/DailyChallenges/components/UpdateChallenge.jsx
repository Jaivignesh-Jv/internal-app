import React, { useState, useEffect } from 'react'
import { Grid, Typography, TextField, Button } from '@mui/material'
import { ThreeDots } from 'react-loader-spinner'
import axios from 'axios'

// Importing the Calendar Component (Susi's Component MODIFIED)
import Calendar from '../assets/Calendar'

const UpdateChallenge = () => {
  //-----------------------------------------------
  // States
  //-----------------------------------------------
  const [isAppReady, setIsAppReady] = useState(false)
  const [selectedDate, setSelectedDate] = useState('')
  const [dailyChallengeData, setDailyChallengeData] = useState(null)
  const [formattedDate, setFormattedDate] = useState(null)
  const [dailyChallengeStatus, setDailyChallengeStatus] = useState('')
  const [updatedClue, setUpdatedClue] = useState('')
  const [updatedAnswer, setUpdatedAnswer] = useState('')
  const [Message, setMessage] = useState('Message')
  const [MessageTypeError, setMessageTypeError] = useState(true)

  //-----------------------------------------------
  // Check if the app is ready to render
  //-----------------------------------------------

  useEffect(() => {
    //---------------Daily Challenge Status Logic----------------
    if (dailyChallengeData !== null && formattedDate !== null) {
      if (new Date().toISOString().split('T')[0] === selectedDate) {
        setDailyChallengeStatus('Active')
        setMessage('Ongoing Challenge')
        setMessageTypeError(false)
      } else if (
        new Date().toISOString().split('T')[0] < selectedDate &&
        dailyChallengeData.daily_challenge_answer &&
        dailyChallengeData.daily_challenge_clue
      ) {
        setDailyChallengeStatus('Available')
        setMessage('Challenge Available')
        setMessageTypeError(false)
      } else if (
        new Date().toISOString().split('T')[0] < selectedDate &&
        (!dailyChallengeData.daily_challenge_clue || !dailyChallengeData.daily_challenge_answer)
      ) {
        setDailyChallengeStatus('Not Available')
        setMessage('Challenge Not Available')
        setMessageTypeError(true)
      } else {
        setDailyChallengeStatus('Expired')
        setMessage('Challenge Expired (Cannot Update)')
      }

      //---------------Set App Ready----------------
      setIsAppReady(true)
    }
  }, [dailyChallengeData, formattedDate, selectedDate])

  //-----------------------------------------------
  // Fetch Data
  //-----------------------------------------------

  //------Fetch Data Function------
  const fetchData = async () => {
    console.log('Fetching Data')
    try {
      const res = await axios.get(`${process.env.REACT_APP_URL}daily-challenge`, {
        params: {
          date: `${selectedDate}T12:00:00.000+00:00`
        }
      })

      // Set States
      setDailyChallengeData(() => {
        if (res.data.length === 0) {
          return {
            daily_challenge_clue: '',
            daily_challenge_answer: '',
            daily_challenge_total_chances: 0
          }
        } else {
          setUpdatedAnswer(res.data[0].daily_challenge_answer)
          setUpdatedClue(res.data[0].daily_challenge_clue)
          return res.data[0]
        }
      })
      setFormattedDate(() => {
        let date = new Date(selectedDate)
        let day = date.getDate()
        let month = date.toLocaleString('default', { month: 'long' })
        let year = date.getFullYear()
        return `${day} ${month} ${year}` // "21 February 2024"
      })
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    setIsAppReady(false)
    if (selectedDate !== '') {
      fetchData()
    }
  }, [selectedDate])

  //-----------------------------------------------
  // Update Details
  //-----------------------------------------------
  const updateDetails = async () => {
    try {
      await axios.patch(`${process.env.REACT_APP_URL}daily-challenge`, {
        id: dailyChallengeData._id,
        daily_challenge_clue: updatedClue,
        daily_challenge_answer: updatedAnswer
      })
      setMessage('Details Updated Successfully')
      setMessageTypeError(false)
    } catch (err) {
      console.log(err)
    }
  }

  //-----------------------------------------------
  // Add Details
  //-----------------------------------------------
  const addDetails = async () => {
    // validating the answer and clue
    if (updatedAnswer === '' || updatedClue === '') {
      return setMessage('Answer and Clue cannot be empty')
    } else if (updatedAnswer.length < 3 || updatedClue.length < 3) {
      return setMessage('Answer and Clue should be at least 3 characters long')
    } else if (updatedAnswer.length >= 10 || updatedClue.length > 100) {
      return setMessage('Answer and Clue should be at most 10 and 100 characters long')
    }
    setMessage('Adding Details')
    // Adding the details - axios
    try {
      await axios
        .post(`${process.env.REACT_APP_URL}daily-challenge`, {
          daily_challenge_type: 'TechnoWordEnigma',
          daily_challenge_display_date: `${selectedDate}T12:00:00Z`,
          daily_challenge_total_chances: '3',
          daily_challenge_clue: updatedClue,
          daily_challenge_answer: updatedAnswer
        })
        .then(() => {
          setMessage('Details Added Successfully')
          setMessageTypeError(false)
          fetchData()
        })
    } catch (err) {
      console.log(err)
      setMessage('Error Adding Details')
      setMessageTypeError(true)
    }
  }

  //-----------------------------------------------
  // Loading Animation - Three Dots
  //-----------------------------------------------
  const loadingAnimation = () => {
    return (
      <ThreeDots
        height='60'
        width='60'
        radius='20'
        color='#4285F4'
        ariaLabel='three-dots-loading'
        wrapperStyle={{}}
        wrapperClassName=''
        visible={true}
      />
    )
  }

  return (
    <Grid container justifyContent='space-between'>
      {/* ---------------------------
    Main Grid
    --------------------------- */}
      {/* ---------------------------
    Calendar Component Grid
    --------------------------- */}
      <Grid
        container
        // direction={'column'}
        xs={12}
        sm={12}
        md={4}
        lg={3}
        xl={3}
        style={{
          padding: '1em',
          border: '1px solid rgba(66, 133, 244, 0.5)',
          borderRadius: '5px',
          marginBottom: '1em'
        }}
      >
        <Grid
          item
          xs={12}
          sm={6}
          md={12}
          lg={12}
          xl={12}
          style={{
            display: 'flex',
            alignItems: 'center',
            border: '1px solid rgba(66, 133, 244, 0.4)',
            // borderRadius: '5px',
            padding: '1em'
          }}
        >
          <Calendar setSelectedDate={setSelectedDate} selectedDate={selectedDate} />
        </Grid>
        {isAppReady ? (
          <Grid
            item
            xs={12}
            sm={6}
            md={12}
            lg={12}
            xl={12}
            style={{
              paddingTop: '2em',
              paddingRight: '1em',
              paddingBottom: '1em',
              paddingLeft: '1em',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Typography style={{ fontSize: '0.9em', color: '#808080', fontWeight: 800 }}>
              {formattedDate}
            </Typography>
            <Grid
              style={{
                paddingLeft: '1em'
              }}
            >
              <Typography
                style={{
                  fontSize: '0.9em',
                  color: '#808080',
                  fontWeight: 500,
                  paddingTop: '0.5em'
                }}
              >
                Status:{' '}
                <span
                  style={{
                    color:
                      dailyChallengeStatus === 'Active'
                        ? '#4CAF50'
                        : dailyChallengeStatus === 'Available'
                        ? 'rgba(66, 133, 244, 0.8)'
                        : dailyChallengeStatus === 'Not Available'
                        ? 'rgba(255, 0, 0, 0.8)'
                        : '#FFC107'
                  }}
                >
                  {dailyChallengeStatus}
                </span>
              </Typography>
              <Typography
                style={{
                  fontSize: '0.9em',
                  color: '#808080',
                  fontWeight: 500,
                  paddingTop: '0.5em'
                }}
              >
                Clue: {dailyChallengeData.daily_challenge_clue}
              </Typography>
              <Typography
                style={{
                  fontSize: '0.9em',
                  color: '#808080',
                  fontWeight: 500,
                  paddingTop: '0.5em'
                }}
              >
                Answer: {dailyChallengeData.daily_challenge_answer}
              </Typography>
            </Grid>
          </Grid>
        ) : (
          <Grid
            style={{
              width: '100%',
              padding: '1em',
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            {loadingAnimation()}
          </Grid>
        )}
      </Grid>

      {/* ---------------------------
    Data Grid
    --------------------------- */}
      {isAppReady ? (
        <Grid
          container
          xs={12}
          sm={12}
          md={7.9}
          lg={8.9}
          xl={8.9}
          style={{
            display: 'flex',
            border: '1px solid rgba(66, 133, 244, 0.5)',
            borderRadius: '5px',
            marginBottom: '1em'
          }}
        >
          <Grid
            style={{
              width: '100%',
              margin: '2em'
            }}
          >
            <Typography
              style={{
                fontSize: '1em',
                fontWeight: 500,
                color: '#808080',
                padding: '1em'
              }}
            >
              UPDATE USER
            </Typography>

            <Grid
              style={{
                padding: '1em',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Grid
                style={{
                  paddingBottom: '1em',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <Typography
                  style={{
                    fontSize: '0.9em',
                    color: '#808080',
                    fontWeight: 500
                  }}
                >
                  Clue:
                </Typography>
                <TextField
                  disabled={
                    dailyChallengeStatus === 'Available' || dailyChallengeStatus === 'Not Available'
                      ? false
                      : true
                  }
                  multiline
                  defaultValue={dailyChallengeData.daily_challenge_clue}
                  inputProps={{
                    style: {
                      fontSize: '0.9em',
                      color: '#808080',
                      fontWeight: 500
                    }
                  }}
                  onChange={e => {
                    setUpdatedClue(e.target.value)
                  }}
                ></TextField>
              </Grid>
              <Grid
                style={{
                  paddingBottom: '1em',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <Typography
                  style={{
                    fontSize: '0.9em',
                    color: '#808080',
                    fontWeight: 500
                  }}
                >
                  Answer:
                </Typography>
                <TextField
                  disabled={
                    dailyChallengeStatus === 'Available' || dailyChallengeStatus === 'Not Available'
                      ? false
                      : true
                  }
                  defaultValue={dailyChallengeData.daily_challenge_answer}
                  inputProps={{
                    style: {
                      fontSize: '0.9em',
                      color: '#808080',
                      fontWeight: 500
                    }
                  }}
                  onChange={e => {
                    setUpdatedAnswer(e.target.value)
                  }}
                ></TextField>
              </Grid>
            </Grid>
            <Grid
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '2em',
                alignItems: 'center'
              }}
            >
              <Grid>
                <Typography
                  style={{
                    fontSize: '0.9em',
                    color: MessageTypeError ? 'rgba(255, 0, 0, 0.8)' : '#808080',
                    fontWeight: 500
                  }}
                >
                  {Message}
                </Typography>
              </Grid>
              <Grid>
                {dailyChallengeStatus === 'Not Available' ? (
                  <Button
                    style={{
                      backgroundColor: '#4285F4',
                      color: 'white'
                    }}
                    onClick={() => {
                      addDetails()
                    }}
                  >
                    Add
                  </Button>
                ) : dailyChallengeStatus === 'Available' ? (
                  <Button
                    style={{
                      backgroundColor: '#4285F4',
                      color: 'white'
                    }}
                    onClick={() => {
                      updateDetails()
                    }}
                  >
                    Update
                  </Button>
                ) : null}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Grid
          container
          xs={12}
          sm={6.9}
          md={7.9}
          lg={8.9}
          xl={8.9}
          style={{
            padding: '1em',
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            border: '1px solid rgba(66, 133, 244, 0.5)',
            borderRadius: '5px',
            marginBottom: '1em'
          }}
        >
          {loadingAnimation()}
        </Grid>
      )}
    </Grid>
  )
}

export default UpdateChallenge
