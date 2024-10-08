require('dotenv').config()
const jwt = require('jsonwebtoken');
const jwtsecret = process.env.ITERJWTSEC
const jwtapikey = process.env.ITERJWTAPIKEY

const generateJWT = (req, res) => {
    console.log(`getjwt body------${JSON.stringify(req.body)}`);

    let dateNow = Math.round(Date.now()/1000);
	// console.log(`dateNow ${dateNow}`);
	// console.log(`dateExp ${dateExp}`);
	// console.log('JWT Create UTC= ', moment.utc(dateNow*1000).format('LLLL'));
	// console.log('JWT Expire UTC= ', moment.utc(dateExp*1000).format('LLLL'));

    /*if(req.query.email){
        jwtPayload = { 
            "email": req.query.email,
            "exp": Math.floor(Date.now() / 1000) + (60 * 60 * 365)
        }
    }
    else{
        jwtPayload = { 
            "userId": req.query.userId,
            "exp": Math.floor(Date.now() / 1000) + (60 * 60 * 365)
        }
    }*/

    let jwtexpireIn = "350d";            
    let token = jwt.sign({
        email: req.body.email || req.body.userId
      }, jwtsecret, { expiresIn: jwtexpireIn });
    console.log(`req body`, req.body);
    let verify = jwt.verify(token,jwtsecret,function(err, decoded){
        if(err){
            console.log('err==>',err);
            return false;
        }else {
            console.log('Decoded.....JWT is VALID');
            return true;
            //console.log('decoded token==>',decoded);
        }
    })
    if(verify){
        res.status(200).json({"success":true,"id_token":token, "jwtexpireIn":jwtexpireIn});
    }
    else{
        res.status(400).json({"success":false,"Error":"Error getting token"});
    }

    //   jwt.sign(
    //     jwtPayload, 
    //     jwtsecret, 
    //     { algorithm: 'HS512' }, 
    //     function(err, token) {
    //         if(err){
    //             console.log('err==>',err);
    //         }else {
    //         console.log(token);
    //         let verify = jwt.verify(token,jwtsecret,function(err, decoded) {
	// 			if(err){
	// 				console.log('err==>',err);
	// 			}else {
	// 				console.log('Decoded.....JWT is VALID');
	// 				//console.log('decoded token==>',decoded);
	// 			}
	// 		})
    //         res.status(200).json({"success":true,"id_token":token,"jwtapikey":jwtapikey,"tokenExp":jwtPayload.exp});
    //         }
    //     });
}

module.exports  = {
    generateJWT
}