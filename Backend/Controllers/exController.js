
const User=require('../Models/user');
const Exercise=require('../Models/Exercises');



//check_cookie() to check cookie
const check_cookie=(req,res)=>{
    console.log("we are in checkcookie");
    const cookieExists = req.cookies.userid !== undefined;
    res.json({cookState:cookieExists});
}

//logout_user()
const logout_user=(req,res)=>{
    res.clearCookie('userid');
    res.send("cookies cleared");
}
//modify_exercise() to modify exercise
const modify_exercise=(req,res)=>{
    const ex=req.body;
    console.log('the request body is:',req.body);
    console.log('the ex id is:',ex.id);
    console.log('a request was made to modify Execise');
    const update={
        name:ex.name,
        set:ex.sets,
        MaxWeight:ex.weight,
        notes:ex.notes
    }
    const filter={_id:ex.id};
   
    Exercise.findOneAndUpdate(filter,update,{upsert:true})
    .then((response)=>console.log("this is the response from findOneAndUpdate",response))
    .catch((error)=>console.log('this is the error from findOneAndUpdate',error));
  
    res.send("record updated successfully");
}

//delete_exercise() to delete exercise
const delete_exercise=(req,res)=>{
      
      const id=req.params.id;
      console.log('We are here to delete a record with id=',id);
      Exercise.findByIdAndDelete(id)
      .then((res)=>console.log(`we deleted exercise with id=${id}`))
      .catch((err)=>console.log(`we got an error while deleting exercise with id=${id}`));
}
//send_exercises() to send exercise list in a particular category for users
const send_exercises=(req,res)=>{
    const cat=req.params.category;
    const cook=req.cookies.userid;
    Exercise.find({userid:cook,type:cat}).sort({createdAt:-1})
    .then((response)=>{
            res.json(response);
    })
    .catch((err)=>console.log("got an error fetching list of exercises",err));
}
//save_exercise() to store exercise for a particular user in a particular category
const save_exercise=(req,res)=>{
    const cat=req.params.category;
    const cook=req.cookies.userid;  
    const ex=new Exercise({
            userid:cook,
            name:req.body.name,
            type:cat,
            set:req.body.sets,
            MaxWeight:req.body.weight,
            notes:req.body.notes
    });
    ex.save()
    .then(()=>{
            console.log('saved the exercise:',req.body);
     })
    .catch(()=>console.log('there is an error saving data'));

    res.send("all is good");
}
//login_user to handle user login
const login_user=(req,res)=>{
    const credentialresponse=req.body;
    const payload=parseJWT(credentialresponse.credential);
    const uid=payload.sub;
    const fname=payload.name;
    User.findOne({userid:uid},(err,doc)=>{
     if(doc==null){
         const user=new User({
             userid:uid,
             fullname:fname
         }
         );
         user.save()
         .then(res=>console.log(`user with userid ${uid} saved`))
         .catch(err=>console.log(`error saving user with user id ${uid}`));
     }
     else{
         console.log(`user with userid=${uid} is already present`);
     }
    });
   res.cookie('userid',uid,{ 
     maxAge:60000000,
     httpOnly:true,
     sameSite:'None',
     secure:true
     });
    res.send('logged in successfully');
 
    function parseJWT(token) {
         var segments = token.toString().split('.');
        // console.log(segments);
         if (segments.length !== 3) {
         throw new Error('Not enough or too many segments');
         }
         // All segment should be base64
         var headerSeg = segments[0];
         var payloadSeg = segments[1];
         var signatureSeg = segments[2];
         // base64 decode and parse JSON
         var header = JSON.parse(atob(headerSeg));
         var payload = JSON.parse(atob(payloadSeg));
         return payload;
     }
}

module.exports={
    check_cookie,
    logout_user,
    modify_exercise,
    delete_exercise,
    send_exercises,
    save_exercise,
    login_user
}