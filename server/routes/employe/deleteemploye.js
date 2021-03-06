var express = require('express');
var router = express.Router();
var func = require('../func.js');
// var edo=require('../edonomix.js');
var con = require('../db');

router.get('/',func.auth2,function(req, res, next) 
{
  var employe_id=req.query.id;
  // req.checkQuery('id', 'id must be a number').optional().isNumber();
  req.checkQuery('id', 'id must be a number').isNumeric();
  var verrs=req.validationErrors();
  if(verrs)
  {
    res.json({ success:false,msg: verrs[0].msg,});
  }
  else
  {
    con.query("update employe set ? where employe_id= ? and employe_status=1 ",[{'employe_status':0,'employe_createdby':req.decoded.aid},employe_id],function(err,employeresult,fields)
    {
      if(err)
      {
        console.log(err);
        res.json({'success':false,msg: 'something went wrong'});
      }
      else
      { 
        if(employeresult["affectedRows"]==1)
        res.json({"success":true,'msg':'employe deleted'});
        else
        res.json({"success":false,'msg':'invalid operation'});    
      }      
    });  
  }        
});
module.exports = router;