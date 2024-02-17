/* eslint-disable no-unused-vars */
import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import session from 'express-session';
import passport from 'passport';
import cors from 'cors'
// import * as auth from './authentication.js';
import User from './database.js';

const app = express();
app.use(cors());
const port =  3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const url = 'https://api.themoviedb.org/3/';
const BearerToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNzAzMmU2YjA4NDMzNmRlMWQ1MTVhMmJhMTEyYmFkOCIsInN1YiI6IjY0ZDNlNDcwZGQ5MjZhMDFlOTg3YmQ1NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nf3OISp0W87cprwZXdkN-4hgY0-dHR7k4w6o_TokVbI";
const config = {
    headers: { Authorization: 'Bearer ' + BearerToken },
    timeout: 5000,
};

app.use(session({
    secret: "filmy hub has no secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000, // 1 day (in milliseconds)
        // Other cookie options if needed...
    },
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb://localhost:27017/MovieWebsite');

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Your other middleware and configuration...

// Home route

app.get('/trendingMovieListDay', async(req, res) => {
    try {
        const trendingMovieListDay = await axios.get(url + 'trending/movie/day', config);
        res.send(trendingMovieListDay.data)
    } catch (error) {
        console.log(error);
        res.status(404);
    }
})


app.get('/trendingMovieListWeek', async(req, res) => {
    try {
        const trendingMovieListWeek = await axios.get(url + 'trending/movie/week', config);
        res.send(trendingMovieListWeek.data)
    } catch (error) {
        console.log(error);
        res.status(404);
    }
})

app.get('/movie/popular', async(req, res) => {
    try {
        const popularMovieList = await axios.get(url + 'movie/popular', config);
        res.send(popularMovieList.data)
    } catch (error) {
        console.log(error);
        res.status(404);
    }
})
app.get('/latestMovieList', async(req, res) => {
    try {
        const response = await axios.get('https://api.themoviedb.org/3/discover/movie?release_date.desc', config);
        const latestMovieList = [];

        for (let i = 0; i < 20; i++) {
            let movie = response.data.results[i];
            movie = await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/videos?language=en-US`, config);
            movie = movie.data.results;
            if (movie.length > 0) {
                for (let j = 0; j < movie.length; j++) {
                    if (movie[j].type === 'Trailer') {
                        latestMovieList.push(movie[j]);
                        break;
                    }
                }
            }
        }
        res.send(latestMovieList);
    } catch (error) {
        console.log(error);
        res.status(404);
    }
})

// Movie List route
app.get('/movie/popular/:page', async (req, res) => {
    const page = req.params.page
    try {
        const popularMovieList = await axios.get(url + `movie/popular?page=${page}`, config);
        res.send(popularMovieList.data);
    } catch (error) {
        console.log(error.message);
        res.status(404).json({ error: error.message });
    }
});

// Search route
app.get('/search', async (req, res) => {
    try {
        const query = req.query.query;
        if (!query) {
            res.status(404).json({ error: 'Query parameter missing' });
        }

        const newQuery = query.replace(/ /g, '%20');

        const movies = await axios.get(url + `/search/movie?query=${newQuery}&include_adult=false`, config);
        res.json({
            movieList: movies.data,
            btn: false,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Movie Details route
app.get('/movie/:id', async (req, res) => {
    try {
        const movieDetails = await axios.get(`${url}movie/${req.params.id}`, config);
        const castDetails = await axios.get(`${url}movie/${req.params.id}/credits?language=en-US`, config);
        res.json({
            movie: movieDetails.data,
            casts: castDetails.data,
        });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// Add to Watchlist route
app.post('/movie/add', async (req, res) => {
    const id = req.body.id;

    
        const userID = req.user._id;

        try {
            const user = await User.findOne({ _id: userID });

            if (user.watchList.includes(id)) {
                res.status(200).json({ message: 'Movie is already in watchList' });
            } else {
                const result = await User.updateOne(
                    { _id: userID },
                    { $push: { watchList: id } }
                );
                res.status(201).json({ message: 'Movie added to watchList successfully' });
            }
        } catch (error) {
            console.error('Error updating watchList:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
});

// Watchlist route
app.get('/watchlist', async (req, res) => {
    try {
            const userID = req.user._id;
            const user = await User.findById(userID);

            let movieList = {
                results: []
            };

            if (user.watchList.length > 0) {
                const axiosPromises = user.watchList.map(async (id) => {
                    const movieDetails = await axios.get(`${url}movie/${id}`, config);
                    return movieDetails.data;
                });

                const movieDetailsArray = await Promise.all(axiosPromises);

                movieList.results = movieDetailsArray;

                res.json({
                    movieList: movieList,
                    btn: false,
                });
            } else {
                res.json({
                    message: 'Please add Movie in watchList',
                    btn: false,
                });
            }
    } catch (error) {
        console.error('Error fetching watchlist:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Signup route
// app.get('/signup', (req, res) => {
//     res.status(200).json({ message: 'Signup route' });
// });

// app.post('/signup', auth.signup);

// Facebook authentication routes
// app.get('/auth/facebook', passport.authenticate('facebook'));
// app.get('/auth/facebook/user', auth.facebookAuth);

// // Google authentication routes
// app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));
// app.get('/auth/google/user', auth.googleAuth);

// // Login route
// app.get('/login', (req, res) => {
//     res.status(200).json({ message: 'Login route' });
// });

// app.post('/login', auth.login);

// // Logout route
// app.get('/logout', auth.logout);

app.listen(port, () => {
    console.log('listening on port ' + port);
});
