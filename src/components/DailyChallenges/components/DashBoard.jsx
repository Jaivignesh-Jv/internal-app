import React, { useState, useEffect } from 'react'
import { Grid, Typography, TextField, Button } from '@mui/material'
import { ThreeDots } from 'react-loader-spinner'
import axios from 'axios'

// Importing the Calendar Component (Susi's Component MODIFIED)
import Calendar from '../assets/Calendar'

const DashBoard = () => {
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
      }

      //---------------Set App Ready----------------
      setIsAppReady(true)
    }
  }, [dailyChallengeData, formattedDate])

  //-----------------------------------------------
  // Fetch Data
  //-----------------------------------------------
  useEffect(() => {
    setIsAppReady(false)
    if (selectedDate !== '') {
      fetchData()
    }
  }, [selectedDate])

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
    Calendar Component Grid
    --------------------------- */}
      <Grid
        container
        direction={'column'}
        xs={12}
        sm={5}
        md={4}
        lg={3}
        xl={3}
        style={{
          padding: '1em',
          border: '1px solid rgba(66, 133, 244, 0.5)',
          borderRadius: '5px'
        }}
      >
        <Grid
          item
          style={{
            display: 'flex',
            alignItems: 'center',
            border: '1px solid rgba(66, 133, 244, 0.2)',
            borderRadius: '5px',
            padding: '1em'
          }}
        >
          <Calendar setSelectedDate={setSelectedDate} selectedDate={selectedDate} />
        </Grid>
        {isAppReady ? (
          <Grid
            item
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
              padding: '1em',
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            {loadingAnimation()}
          </Grid>
        )}
      </Grid>
      {/* 
      <Grid container xs={12} sm={6.9} md={7.9} lg={8.9} xl={8.9}>
        hi
      </Grid> */}
    </Grid>
  )
}

export default DashBoard
