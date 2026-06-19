const express=require('express')
const app=express()
const z =require('zod')
app.use(express.json())

const port=3000
let id=0
const constdb = {
  users: [],
  bookings: [],
  movies: [
    {
      id:1,
      title:"Inception",
      genre:"Sci-Fi",
      duration:148,
      shows: [
        {
          showId:101,
          time:"10:00 AM",
          pricePerSeat:200,
          availableSeats:50
        },
        {
          showId:102,
          time:"2:00 PM",
          pricePerSeat:250,
          availableSeats:50
        },
        {
          showId:103,
          time:"6:00 PM",
          pricePerSeat:300,
          availableSeats:50
        }
      ]
    },
    {
      id:2,
      title:"The Dark Knight",
      genre:"Action",
      duration:152,
      shows: [
        {
          showId:201,
          time:"11:00 AM",
          pricePerSeat:200,
          availableSeats:50
        },
        {
          showId:202,
          time:"3:00 PM",
          pricePerSeat:250,
          availableSeats:50
        },
        {
          showId:203,
          time:"7:00 PM",
          pricePerSeat:300,
          availableSeats:50
        }
      ]
    },
    {
      id:3,
      title:"Interstellar",
      genre:"Sci-Fi",
      duration:169,
      shows: [
        {
          showId:301,
          time:"12:00 PM",
          pricePerSeat:250,
          availableSeats:50
        },
        {
          showId:302,
          time:"5:00 PM",
          pricePerSeat:300,
          availableSeats:50
        }
      ]
    }
  ]
}

const signup=z.object({
    username:z.string().max(20),
    password:z.string().max(5),
    email:z.string().max(20)
})

const signin=z.object({
    username:z.string().max(20),
    password:z.string().max(5)
})

const booking=z.object({
    
    movieId:z.number(),
    showId:z.number(),
    seats:z.number().int().positive()

})

app.post('/signup',(req,res)=>{
    const result=signup.safeParse(req.body)
    if(!result.success){
        return res.status(401).json({
            success:false,
            message:"invalid"
        })
    }
    const username=result.data.username
    const password=result.data.password
    const email=result.data.email
    if(constdb.users.find(u=>u.email===email)){
        return res.status(401).json({
            success:false,
            message:"email address already exists"
        })
    }
    let user={
        id:id++,
        username:username,
        password:password,
        email:email,
        token:null
    }

    constdb.users.push(user)
    return res.status(200).json({
        success:true,
        message:"user created successfully",
        id:user.id,
        token:null
    })

})


app.post('/signin',(req,res)=>{
    const result=signin.safeParse(req.body)
    if(!result.success){
        return res.status(403).json({
            success:false,
            message:"invalid credentials"
    })
    }
    
    const username=result.data.username
    const password=result.data.password
    const user=constdb.users.find(u=>u.username===username && u.password===password)
    if(user){
        const token=Math.random().toString()
        user.token=token
        return res.status(200).json({
            
                success:true,
                message:"Signin successful",
                token:token
        })
    }
    return res.status(403).json({
        success:false,
        message:"invalid credentials"
    })
        
})

app.get('/movies',(req,res)=>{
    res.json({
        success:true,
        data:constdb.movies
    })
})

app.get('/movies/:movieId',(req,res)=>{
    const movieId=Number(req.params.movieId)
    const movie=constdb.movies.find(m=>m.id===movieId)
    if(!movie){
        return res.status(404).json({
            success:false,
            message:"Movie not found"
        })
    }
    return res.json({
        success:true,
        data:movie
    })
})


app.get('/movies/:movieId/shows',(req,res)=>{
    const movieid=Number(req.params.movieId)
    const movie=constdb.movies.find(m=>m.id===movieid)
    if(!movie){
       return res.status(404).json({
            success:false,
            message:"Movie not found"
        }) 
    }

    return res.status(200).json({
        success:true,
        data:movie.shows

    })
})


// Booking management
let bookingid=1001
app.post('/bookings/:userId',(req,res)=>{
    const userid=Number(req.params.userId)
    const token=req.headers.authorization
    const user=constdb.users.find(u=>u.id===userid)
    if(!user){
        return res.status(404).json({
            success:false,
            message:"user not found"
        }) 
    }
    if(!token || user.token!==token){
        return res.status(401).json({
            success:false,
            message:"unauthorized"
        })
    }

    const result=booking.safeParse(req.body)
    if(!result.success){
        return res.status(400).json({
            success:false,
            message:"invalid booking details"
    })
    }

    let movieid=result.data.movieId
    let showid=result.data.showId
    let seats=result.data.seats

    let book=constdb.movies.find(m=>m.id===movieid)
    if(!book){
        return res.status(404).json({
            success:false,
            message:"Movie not found"
        })
    }
    const show=book.shows.find(s=>s.showId===showid)
    if(!show){
        return res.status(404).json({
            success:false,
            message:"Show not found"
        })
    }
    if(seats>show.availableSeats){
        return res.status(400).json({
            success:false,
            message:"Seats not available"
        })
    }
    const today = new Date()
    const bookingobj={
        bookingId:bookingid++,
        userId:userid,
        movieId:movieid,
        showId:showid,
        seats:seats,
        totalAmount:show.pricePerSeat*seats,
        status:"confirmed",
        date:today.toDateString()
    }
    show.availableSeats=show.availableSeats-seats
    constdb.bookings.push(bookingobj)
    return res.status(200).json({
        success:true,
        message:"Booking successful",
        bookingId:bookingobj.bookingId,
        movieTitle:book.title,
        showTime:show.time,
        seats:seats,
        totalAmount:bookingobj.totalAmount
    })
    
})

app.get('/bookings/:userId',(req,res)=>{
    let userid=Number(req.params.userId)
    const token=req.headers.authorization
    const user=constdb.users.find(u=>u.id===userid)
    if(!user){
        return res.status(404).json({
            success:false,
            message:"user not found"
        })

    }
    if(!token || user.token!==token){
        return res.status(401).json({
            success:false,
            message:"unauthorized"
        })
    }
    let userbooking=constdb.bookings.filter(b=>b.userId===userid)
    
    return res.status(200).json({
        success:true,
        data:userbooking
    })
})


app.listen(port)

