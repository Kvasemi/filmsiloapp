import React, { useContext, useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import { getUser, createUser, updateUser } from "../actions/users";
import {
  getReviews,
  createReview,
  updateReview,
  deleteReview,
} from "../actions/reviews";

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const reviewInitialState = {
    movie_id: "",
    user_id: "",
    username: "",
    movie_name: "",
    date_created: "",
    num_stars: 0,
    review_title: "",
    review_body: "",
  };

  // state to send to backend when creating user's mongodb
  const userInitialState = {
    name: "",
    email: "",
    password: "",
    reviews: [],
  };

  // state to grab form info to send via fetch api to mongodb for authentication
  const userLoginInitialState = { email: "", password: "" };

  const [currentUser, setCurrentUser] = useState(null);
  const [movieQueryList, setMovieQueryList] = useState([]);
  const [personQueryList, setPersonQueryList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [movie, setMovie] = useState({});
  const [crewList, setCrewList] = useState([]);
  const [query, setQuery] = useState(null);
  const [randMovie, setRandMovie] = useState({});
  const [person, setPerson] = useState({});
  const [relatedMovieList, setRelatedMovieList] = useState([]);
  const [searchToggle, setSearchToggle] = useState(false);
  const [showToggle, setShowToggle] = useState(false);
  const [showComponent, setShowComponent] = useState(false);
  const [showEditComponent, setShowEditComponent] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [toggleSignInUp, setToggleSignInUp] = useState(false);
  const [drawerState, setDrawerState] = useState(false);
  const [review, setReview] = useState(reviewInitialState);
  const [user, setUser] = useState(userInitialState);
  const [userLogin, setUserLogin] = useState(userLoginInitialState);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [alerts, setAlerts] = useState("");
  const [reviewCollection, setReviewCollection] = useState([]);
  const [reviewWritten, setReviewWritten] = useState(false);

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const history = useHistory();

  // SEARCH
  const searchInputHandler = (e) => {
    e.preventDefault();

    setQuery(e.target.value);
  };

  const movieToggleHandler = () => {
    setSearchToggle(false);
  };

  const peopleToggleHandler = () => {
    setSearchToggle(true);
  };

  // SIGN IN
  const signInEmailHandler = (e) => {
    setUserLogin({ ...userLogin, email: e.target.value });
  };

  const signInPasswordHandler = (e) => {
    setUserLogin({ ...userLogin, password: e.target.value });
  };

  const signInHandler = async (e) => {
    e.preventDefault();
    setAlerts("");

    const res = await getUser(userLogin);
    if (res && !("message" in res)) {
      setCurrentUser({ ...currentUser, ...res.res });
      if (reviewCollection.length > 0) {
        const isWritten = () => {
          for (let rev of reviewCollection) {
            if (res.res.reviews.includes(rev._id)) {
              return true;
            }
          }
          return false;
        };
        if (isWritten()) {
          setReviewWritten(true);
        }
      }
      setDrawerState(false);
      setUserLogin(userLoginInitialState);
      setAlerts("success");
      setSnackbarOpen(true);
    } else {
      setAlerts("error");
      setSnackbarOpen(true);
    }
  };

  // SIGN UP
  const signUpNameHandler = (e) => {
    setUser({ ...user, name: e.target.value });
  };

  const signUpEmailHandler = (e) => {
    setUser({ ...user, email: e.target.value });
  };

  const signUpPasswordHandler = (e) => {
    setUser({ ...user, password: e.target.value });
  };

  const confirmPasswordHandler = (e) => {
    setConfirmPassword(e.target.value);
  };

  const signUpHandler = async (e) => {
    e.preventDefault();
    setAlerts("");

    if (confirmPassword === user.password) {
      const res = await createUser(user);
      if (res) {
        setCurrentUser({ ...currentUser, ...res.res });
        setDrawerState(false);
        setAlerts("success");
        setSnackbarOpen(true);
      } else {
        setAlerts("error");
        setSnackbarOpen(true);
      }
    } else {
      setAlerts("error");
      setSnackbarOpen(true);
    }
  };

  const signInUpHandler = () => {
    setToggleSignInUp(!toggleSignInUp);
    setUser(userInitialState);
    emailRef.current.value = "";
    passwordRef.current.value = "";
  };

  const logOutHandler = () => {
    setDrawerState(false);
    setCurrentUser(null);
    setShowComponent(false);
    setAlerts("success");
    setSnackbarOpen(true);
  };

  // REVIEWS
  const reviewBodyHandler = (e) => {
    setReview({ ...review, review_body: e.target.value });
  };

  const reviewTitleHandler = (e) => {
    setReview({ ...review, review_title: e.target.value });
  };

  const changeRatingHandler = (newRating) => {
    setReview({ ...review, num_stars: newRating });
  };

  const reviewSubmitHandler = async (e) => {
    e.preventDefault();
    setAlerts("");

    const res = await createReview(review);
    currentUser.reviews.push(res._id);
    setReviewCollection([...reviewCollection, res]);
    localStorage.setItem("reviewCollection", JSON.stringify(reviewCollection));
    setCurrentUser({ ...currentUser, reviews: currentUser.reviews });
    const response = await updateUser(currentUser._id, currentUser);
    if (response.message) {
      const reviewResponse = await getReviews();
      const reviewData = reviewResponse.filter((fetchedReview) => {
        return fetchedReview.movie_id === review.movie_id;
      });
      const sortedReviews = sortByNestedKey(reviewData);
      setReviewCollection(sortedReviews);
      localStorage.setItem("reviewCollection", JSON.stringify(sortedReviews));
      setReviewWritten(true);
      setReview(reviewInitialState);
      setShowComponent(false);
      setAlerts("success");
      setSnackbarOpen(true);
    } else {
      setAlerts("error");
      setSnackbarOpen(true);
    }
  };

  const toggleReviewHandler = () => {
    setShowComponent(false);
    setReview(reviewInitialState);
  };

  const toggleFormHandler = () => {
    setShowComponent(true);
    setReview({
      ...review,
      user_id: currentUser._id,
      username: currentUser.name,
      date_created: new Date(),
      movie_id: getLocalMovie().id,
      movie_name: getLocalMovie().title,
    });
  };

  const editReviewHandler = async (reviewProp) => {
    setShowEditComponent(true);
    setShowComponent(true);
    setReview(reviewProp);
  };

  const editReviewSubmitHandler = async (e, id, updatedReview) => {
    e.preventDefault();
    setAlerts("");

    const res = await updateReview(id, updatedReview);
    if (res.message) {
      const reviewResponse = await getReviews();
      const reviewData = reviewResponse.filter((review) => {
        return review.movie_id === updatedReview.movie_id;
      });
      const sortedReviews = sortByNestedKey(reviewData);
      setReviewCollection(sortedReviews);
      localStorage.setItem("reviewCollection", JSON.stringify(sortedReviews));
      setReview(reviewInitialState);
      setShowComponent(false);
      setShowEditComponent(false);
      setAlerts("success");
      setSnackbarOpen(true);
    } else {
      setAlerts("error");
      setSnackbarOpen(true);
    }
  };

  const deleteReviewHandler = async (id, reviewProp) => {
    try {
      const res = await deleteReview(id);
      const remainingReviews = currentUser.reviews.filter(
        (review) => review !== id
      );
      setCurrentUser({ ...currentUser, reviews: remainingReviews });
      const response = await updateUser(currentUser._id, {
        ...currentUser,
        reviews: remainingReviews,
      });
      if (reviewCollection.length > 1) {
        const reviewResponse = await getReviews();
        const reviewData = reviewResponse.filter((fetchedReview) => {
          return fetchedReview.movie_id === reviewProp.movie_id;
        });
        const sortedReviews = sortByNestedKey(reviewData);
        setReviewCollection(sortedReviews);
        localStorage.setItem("reviewCollection", JSON.stringify(sortedReviews));
        setReviewWritten(false);
        setReview(reviewInitialState);
        setShowComponent(false);
        setAlerts("success");
        setSnackbarOpen(true);
      } else {
        setReviewCollection([]);
        localStorage.setItem("reviewCollection", JSON.stringify([]));
        setReviewWritten(false);
        setReview(reviewInitialState);
        setShowComponent(false);
        setAlerts("success");
        setSnackbarOpen(true);
      }
    } catch (error) {
      setAlerts("error");
      setSnackbarOpen(true);
    }
  };

  // SNACKBAR
  const snackbarCloseHandler = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  // UTILITY FUNCS
  const randMoviePicker = (fetchedMovieList) => {
    const rand = (max, min) => Math.random() * (max - min) + min;
    return fetchedMovieList[Math.round(rand(fetchedMovieList.length - 1, 0))];
  };

  const getDay = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();

    today = yyyy + "-" + mm + "-" + dd;
    return today;
  };

  const addDays = (date, days) => {
    let today = new Date(date);
    today.setDate(today.getDate() + days);
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();
    let newDate = yyyy + "-" + mm + "-" + dd;
    return newDate;
  };

  const numOfDays = 30;

  const formatDate = (date) => {
    const newArray = date.split("-");
    const newDate = `${newArray[1]}/${newArray[2]}/${newArray[0]}`;
    return newDate;
  };

  const sortByNestedKey = (array) => {
    let sorted = array.sort(
      (a, b) => new Date(b.date_created) - new Date(a.date_created)
    );
    return sorted;
  };

  const checkIfReviewWritten = (reviews) => {
    for (let rev of reviews) {
      if (currentUser.reviews.includes(rev._id)) {
        setReviewWritten(true);
        return;
      }
    }
    setReviewWritten(false);
  };

  // FETCH
  const popularMovies = () => {
    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=96aef73142a3bf028320faa7a7476a67"
    )
      .then((res) => res.json())
      .then((data) => {
        setMovieList(data.results);
        setRandMovie(randMoviePicker(data.results));
      })
      .catch((err) => console.log(err));
  };

  const upcomingMovies = () => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=96aef73142a3bf028320faa7a7476a67&page=1&language=en-US&release_date.gte=${getDay()}&release_date.lte=${addDays(
        getDay(),
        numOfDays
      )}&with_release_type=2|3&include_video=false&region=US`
    )
      .then((res) => res.json())
      .then((data) => {
        setMovieList(data.results);
        setRandMovie(randMoviePicker(data.results));
      })
      .catch((err) => console.log(err));
  };

  const searchSubmitHandler = async (e) => {
    e.preventDefault();

    if (!query) {
      console.log("null was called");
    } else {
      const movieResponse = await fetch(
        `https://api.themoviedb.org/3/search/movie?&api_key=96aef73142a3bf028320faa7a7476a67&query=${query}`
      );
      const movieData = await movieResponse.json();
      localStorage.setItem("movieQueryList", JSON.stringify(movieData.results));
      setMovieQueryList(movieData.results);
      const personResponse = await fetch(
        `https://api.themoviedb.org/3/search/person?api_key=96aef73142a3bf028320faa7a7476a67&search_type=ngram&query=${query}`
      );
      const personData = await personResponse.json();
      localStorage.setItem(
        "personQueryList",
        JSON.stringify(personData.results)
      );
      setPersonQueryList(personData.results);

      if (movieData.results.length < 1 && personData.results.length < 1) {
        e.target.placeholder = "NO MATCH FOUND";
      } else {
        history.push("/search");
      }
      setQuery(null);
      setSearchToggle(false);
    }
  };

  const movieClickHandler = async (id) => {
    const movieResponse = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=96aef73142a3bf028320faa7a7476a67`
    );
    const movieData = await movieResponse.json();
    localStorage.setItem("movie", JSON.stringify(movieData));
    setMovie(movieData);
    const crewResponse = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=96aef73142a3bf028320faa7a7476a67`
    );
    const crewData = await crewResponse.json();
    localStorage.setItem("crewList", JSON.stringify(crewData));
    setCrewList(crewData);
    const reviewResponse = await getReviews();
    if (reviewResponse.length > 0) {
      const reviewData = reviewResponse.filter((review) => {
        return review.movie_id === movieData.id;
      });
      if (currentUser) {
        checkIfReviewWritten(reviewData);
      }
      const sortedReviews = sortByNestedKey(reviewData);
      setReviewCollection(sortedReviews);
      localStorage.setItem("reviewCollection", JSON.stringify(sortedReviews));
    } else {
      setReviewCollection(reviewResponse);
      localStorage.setItem("reviewCollection", JSON.stringify(reviewResponse));
      setReviewWritten(false);
    }
    history.push(`/movie/${id}`);
    toggleReviewHandler();
  };

  const personClickHandler = (id) => {
    fetch(
      `https://api.themoviedb.org/3/person/${id}?api_key=96aef73142a3bf028320faa7a7476a67`
    )
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("person", JSON.stringify(data));
        setPerson(data);
      })
      .catch((err) => console.log(err));
    fetch(
      `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=96aef73142a3bf028320faa7a7476a67`
    )
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("relatedMovieList", JSON.stringify(data));
        setRelatedMovieList(data);
        history.push(`/person/${id}`);
      })
      .catch((err) => console.log(err));
    setReviewWritten(false);
  };

  // LOCALSTORAGE
  const getLocalMovie = () => {
    return JSON.parse(localStorage.getItem("movie", JSON.stringify(movie)));
  };

  const getLocalCrew = () => {
    return JSON.parse(
      localStorage.getItem("crewList", JSON.stringify(crewList))
    );
  };

  const getLocalPerson = () => {
    return JSON.parse(localStorage.getItem("person", JSON.stringify(person)));
  };

  const getLocalrelatedMovieList = () => {
    return JSON.parse(
      localStorage.getItem("relatedMovieList", JSON.stringify(relatedMovieList))
    );
  };

  const getLocalMovieQueryList = () => {
    return JSON.parse(
      localStorage.getItem("movieQueryList", JSON.stringify(movieQueryList))
    );
  };

  const getLocalPersonQueryList = () => {
    return JSON.parse(
      localStorage.getItem("personQueryList", JSON.stringify(personQueryList))
    );
  };

  const getLocalReviewCollectionList = () => {
    return JSON.parse(
      localStorage.getItem("reviewCollection", JSON.stringify(reviewCollection))
    );
  };

  // CONTEXT VALUES
  const value = {
    movieList,
    setMovieList,
    crewList,
    setCrewList,
    movie,
    setMovie,
    movieClickHandler,
    searchSubmitHandler,
    searchInputHandler,
    getLocalMovie,
    getLocalCrew,
    randMovie,
    setRandMovie,
    movieQueryList,
    setMovieQueryList,
    personClickHandler,
    person,
    setPerson,
    getLocalPerson,
    relatedMovieList,
    setRelatedMovieList,
    getLocalrelatedMovieList,
    popularMovies,
    upcomingMovies,
    personQueryList,
    setPersonQueryList,
    getLocalMovieQueryList,
    getLocalPersonQueryList,
    getDay,
    addDays,
    movieToggleHandler,
    peopleToggleHandler,
    searchToggle,
    formatDate,
    showToggle,
    setShowToggle,
    showComponent,
    setShowComponent,
    toggleReviewHandler,
    toggleFormHandler,
    review,
    setReview,
    changeRatingHandler,
    user,
    setUser,
    userLogin,
    setUserLogin,
    reviewBodyHandler,
    reviewTitleHandler,
    reviewSubmitHandler,
    signUpNameHandler,
    signInEmailHandler,
    signInPasswordHandler,
    signInHandler,
    signUpHandler,
    signUpEmailHandler,
    signUpPasswordHandler,
    confirmPasswordHandler,
    signInUpHandler,
    toggleSignInUp,
    setToggleSignInUp,
    nameRef,
    emailRef,
    passwordRef,
    currentUser,
    setCurrentUser,
    drawerState,
    setDrawerState,
    logOutHandler,
    snackbarOpen,
    setSnackbarOpen,
    snackbarCloseHandler,
    alerts,
    setAlerts,
    getLocalReviewCollectionList,
    reviewWritten,
    setReviewWritten,
    reviewCollection,
    setReviewCollection,
    sortByNestedKey,
    deleteReviewHandler,
    editReviewHandler,
    showEditComponent,
    editReviewSubmitHandler,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
