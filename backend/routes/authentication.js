import { PrismaClient } from '@prisma/client'

const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();
const prisma = new PrismaClient();
const saltRounds = 10

router.post('/signup', async(req, res) => {
    try {
        const { username, first_name, last_name, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user in the User model
        const user = await prisma.user.create({
            data: {
                username,
                first_name,
                last_name,
                email,
                hashedPassword,
              },
        });

        // Check if optional profile data is provided   
        if (req.body.profileData){
            const { picture, bio, location, interests } = req.body.profileData;

            // Create a new profile in the Profile model and associate it with the user
            await prisma.profile.create({
                data: {
                    picture,
                    bio,
                    location,
                    interests,
                    user_id: user.user_id,
                }
            });
        } else {
            // If no profile data is provided, create an empty profile for the user
            await prisma.profile.create({
                data: {
                    user_id: user.user_id
                }
            });
        }   

        res.status(201).json({message: 'User registered successfully'});
    } catch (error) {

        console.error('Error during registration', error)
        res.status(500).json({error: 'An error occurred during registration'})
        
    }
});


router.post('/login', async (req, res) => {
    //Check if username or email
    // check if username/email exist
    // if user :  login
    // if not : error msg / refuse login
    // Additionally assign tokens to logged in user

    try {
        const {username, password, email} = req.body   
        let user = undefined

        // Check if user used email or password for authentication (both unique)
        if (username) {
                user = await prisma.user.findUnique({
                where: {
                    username,
                },
            });
        }else {
            user = await prisma.user.findUnique({
                where: {
                    email,
                },
            });
        }

        // If the user doesn't exist, return an error
        if (!user){
            return res.status(401).json({ error: 'Invalid credentials' })
        }

        // Compare the provided password with the hashed password stored in the database
        const passwordMatch = await bcrypt.compare(password, user.password)

        // If the passwords don't match, return an error
        if(!passwordMatch){
            return res.status(401).json({error: 'Invalid Credentials'})
        }

        // Passwords match, user is authenticated
        res.json({message: 'Login successfull', user: user.username})
    } catch (error) {
        
        Console.error("Error logging in", error)
        res.status(500).json({ error: 'An error occurred logging you in' })
    }
});
