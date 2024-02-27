import React, { useState, useEffect } from 'react'
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  TableContainer,
  Table,
  TableCell,
  TableRow,
  TableBody,
  TableHead,
  IconButton,
  Avatar,
  Tooltip
} from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import { BallTriangle, ThreeDots } from 'react-loader-spinner'

import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'
import InsightsIcon from '@mui/icons-material/Insights'

import axios from 'axios'

import { CiMail } from 'react-icons/ci'
import { GoDotFill } from 'react-icons/go'
import DashBoard from './components/DashBoard'
import UpdateChallenge from './components/UpdateChallenge'
import UserDetails from './components/UserDetails'

const Main = () => {
  const [activeNavBar, setActiveNavBar] = useState('UPDATE CHALLENGE')

  const switchDashboard = item => () => {
    setActiveNavBar(item)
  }

  return (
    <Grid
      style={{
        width: '100%',
        height: '100%'
      }}
    >
      {false ? (
        <>
          <Grid
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '1em'
            }}
          >
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
          </Grid>
        </>
      ) : (
        <>
          {/* -------------------------
                Header
                ------------------------- */}
          <Grid
            style={{
              position: 'sticky',
              display: 'flex',
              alignItems: 'center'
              // border: '1px solid red'
            }}
          >
            <Grid
              style={{
                width: '100%',
                alignItems: 'center',
                padding: '1em 0em',
                marginLeft: 15,
                paddingTop: '20px',
                borderBottom: '1px solid rgba(66, 133, 244, 0.2)'
              }}
            >
              <Typography
                style={{
                  fontSize: '0.75em',
                  color: '#000000'
                }}
              >
                Daily Challenges
              </Typography>
            </Grid>
          </Grid>
          {/* -------------------------
                selector
                ------------------------- */}
          <Grid
            style={{
              display: 'flex'
            }}
          >
            <Grid
              style={{
                display: 'flex',
                flexDirection: 'row',
                margin: '1em',
                marginLeft: '3em'
              }}
            >
              {['DASHBOARD', 'UPDATE CHALLENGE'].map((item, index) => {
                return (
                  <Grid
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      cursor: 'pointer',
                      border: `1px solid rgba(66, 133, 244, ${activeNavBar === item ? 0.8 : 0.3})`,
                      borderLeft: `5px solid rgba(66, 133, 244, ${
                        activeNavBar === item ? 0.8 : 0.3
                      })`,
                      boxShadow: '2px 2px 10px #d9d9d9, -2px -2px 10px #e7e7e7',
                      width: '20em',
                      height: '3em',
                      paddingLeft: '1em',
                      marginRight: '1em',
                      borderRadius: '5px',
                      fontSize: 12,
                      color: '#8D99AE',
                      fontWeight: 600
                    }}
                    onClick={switchDashboard(item)}
                  >
                    {item === 'DASHBOARD' ? (
                      <InsightsIcon
                        style={{
                          width: 14,
                          paddingRight: 10,
                          color: '#4285F4'
                        }}
                      />
                    ) : item === 'UPDATE CHALLENGE' ? (
                      <SystemUpdateAltIcon
                        style={{
                          width: 14,
                          paddingRight: 10,
                          color: '#4285F4'
                        }}
                      />
                    ) : // <AssignmentIndIcon
                    //   style={{
                    //     width: 14,
                    //     paddingRight: 10,
                    //     color: '#4285F4'
                    //   }}
                    // />
                    null}
                    {item}
                  </Grid>
                )
              })}
            </Grid>
          </Grid>

          {/* -------------------------
                Components
                ------------------------- */}
          <Grid
          // container
          >
            <Grid
              // item
              style={{
                marginLeft: '3em',
                margin: '1em 1em 1em 3em '
              }}
              // xs={12}
              // sm={12}
              // md={12}
              // lg={12}
              // xl={12}
            >
              {' '}
              {activeNavBar == 'DASHBOARD' ? (
                <DashBoard />
              ) : activeNavBar == 'UPDATE CHALLENGE' ? (
                <UpdateChallenge />
              ) : // <UserDetails />
              null}
            </Grid>
          </Grid>
        </>
      )}
    </Grid>
  )
}

export default Main

// <Grid
// container
// style={{
//   display: "flex",
//   justifyContent: "center",
//   paddingBottom: "1em",
// }}
// >
// <Grid
//   item
//   sm={12}
//   md={10}
//   lg={10}
//   xl={10}
//   style={{
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginTop: "0.5em",
//   }}
// >
//   <Grid
//     style={{
//       display: "flex",
//       alignItems: "center",
//       border: "1px solid green",
//     }}
//   ></Grid>
// </Grid>

// <Grid
//   item
//   sm={12}
//   md={10}
//   lg={10}
//   xl={10}
//   style={{ marginTop: "1em" }}
// ></Grid>
// </Grid>

{
  /* <div
style={{
  width: "96.4%",
  height: "94%",
  top: 47,
  left: "3.4%",
  position: "fixed",
  alignItems: "left",
  // border: "1px solid red",
}}
>


</div> */
}

// <div
// style={{
//   margin: 10,
//   width: "100%",
//   height: "100%",
// }}
// >
// <div
//   style={{
//     borderBottom: "1px solid "1px solid rgba(66, 133, 244, 0.2)",",
//     paddingTop: 20,
//   }}
// >
//   <p style={{ fontFamily: "sans-serif", fontSize: 12 }}>
//     Daily Challenges
//   </p>
// </div>
// </div>
