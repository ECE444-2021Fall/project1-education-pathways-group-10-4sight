import { Typography, Rating, Divider } from "@mui/material"
import { useParams } from "react-router-dom"
import BookmarkButton from "../Components/bookmarkButton"
import { NavBar } from "../Components/navbar"
import { makeStyles, useTheme } from "@mui/styles"
import { useEffect, useState } from "react"

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

const useStyles = makeStyles((theme) => ({
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: theme.palette.text.grey,
    marginRight: 20,
  },
  text: {
    fontSize: 18,
    color: theme.palette.text.grey,
  },
  divider: {
    backgroundColor: theme.palette.background.lightBlue,
    height: "3px",
    margin: "41px 0",
    borderRadius: "50px",
  },
  align: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  cornerBorder: {
    borderRadius: "14px",
    border: "4px solid",
    borderColor: theme.palette.background.lightBlue,
    padding: "81px 137px",
  },
}))

export const CourseContent = () => {
  const theme = useTheme()
  const { course_id } = useParams()
  const classes = useStyles()
  const [result, setResult] = useState()

  useEffect(() => {
    return fetch(`${API_BASE_URL}/course/${course_id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if (data.pre_requisites === "[]") {
          data.pre_requisites = "None"
        }
        if (data.corequisites === "[]") {
          data.corequisites = "None"
        }
        data.term = data.term
          .replace("[", "")
          .replace("]", "")
          .replaceAll("' ", ", ")
          .replaceAll("'", "")
        setResult({
          ...data,
          rating: Math.random() * 5,
          views: Math.round(Math.random() * 10000),
        })
      })
  }, [course_id])

  if (!result) return null

  return (
    <>
      <NavBar />
      <div id="page-container" style={{ margin: "62px 172px" }}>
        <div id="course-container" className={classes.cornerBorder}>
          <div id="segment1">
            <div style={{ display: "flex" }}>
              <Typography
                sx={{
                  fontSize: 18,
                  fontWeight: "bold",
                  paddingRight: 4,
                  margin: "auto 0",
                  color: theme.palette.text.grey,
                }}
              >
                {result.code} &#8211; {result.name}
              </Typography>
              <Rating
                sx={{ margin: "auto 0" }}
                value={result.rating}
                readOnly
              />
              <Typography
                sx={{
                  margin: "auto 0",
                  paddingLeft: 1,
                  paddingRight: 4,
                  fontSize: 14,
                  color: theme.palette.text.grey,
                }}
              >
                {Math.round(result.rating)}/5 (
                {Math.round(Math.random() * 1000)} votes)
              </Typography>
              <Typography
                sx={{
                  margin: "auto 0",
                  fontSize: 14,
                  color: theme.palette.text.grey,
                }}
              >
                {result.views} Views
              </Typography>
              <BookmarkButton
                sx={{ marginLeft: "auto" }}
                course_id={result.code}
              />
            </div>
            <Typography
              sx={{ padding: "6px 42px", color: theme.palette.text.grey }}
            >
              {result.course_description}
            </Typography>
          </div>
          <Divider className={classes.divider} />
          <div id="segment2" className={classes.align}>
            <div className={classes.align} style={{ width: "50%" }}>
              <Typography className={classes.header}>Division: </Typography>
              <Typography className={classes.text}>
                {result.division}
              </Typography>
            </div>
            <div className={classes.align} style={{ width: "50%" }}>
              <Typography className={classes.header}>Department: </Typography>
              <Typography className={classes.text}>
                {result.department}
              </Typography>
            </div>
          </div>
          <Divider className={classes.divider} />
          <div id="segment3" className={classes.align}>
            <Typography className={classes.header}>Pre-requisites: </Typography>
            <Typography className={classes.text}>
              {result.pre_requisites}
            </Typography>
          </div>
          <Divider className={classes.divider} />
          <div id="segment4" className={classes.align}>
            <Typography className={classes.header}>Co-requisites: </Typography>
            <Typography className={classes.text}>
              {result.corequisites}
            </Typography>
          </div>
          <Divider className={classes.divider} />
          <div id="segment5" className={classes.align}>
            <div className={classes.align} style={{ width: "50%" }}>
              <Typography className={classes.header}>Campus: </Typography>
              <Typography className={classes.text}>{result.campus}</Typography>
            </div>
            <div className={classes.align} style={{ width: "50%" }}>
              <Typography className={classes.header}>Term: </Typography>
              <Typography className={classes.text}>{result.term}</Typography>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
