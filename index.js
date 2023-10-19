

async function DecodeToken(Token) {
    
    let authResponse = await fetch('http://127.0.0.1:5000/' + "Token/decode_token", {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({//
            Token:Token,
        }),
    }).then(response => response.json())
	.then(data => {return data})
    .catch(function(error){
        //
        return error
    });
    return authResponse
}


async function verifyToken(req,res,next){
    //verify if token is on users browser
    let Token = req.params.Token 
    let response = await DecodeToken(Token)
    if(response.error == "Invalid token" || response.error == "expired" || !Token){
        return res.redirect("/")
    }next()
}


module.exports = {verifyToken,DecodeToken}