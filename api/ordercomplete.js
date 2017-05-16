/**
 * Copyright 2017 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

 'use strict';
 
//const Conversation = require('watson-developer-cloud/conversation/v1'); // watson sdk
//const config = require('../util/config');
const cloudant = require('../util/db_orderkakao');
const db = cloudant.db;

let doUpdate = (req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  var _id = req.param('_id')
  console.log('_id : '+_id);
  
  //user_key를 사용하여 db에 저장된 context가 있는지 확인합니다.
  db.get(_id).then(doc => {
      // context를 업데이트 합니다.
      console.log('기존 주문 건이 있습니다.');
      db.insert(Object.assign(doc, {
        'context': Object.assign(doc.context, {
          'mtworks_yn' : "Y"
        }),
      }));
      
  }).catch(function(err) {
      return res.json({
          "message" : {
            "text" : JSON.stringify(err.message)
          }
      });
  });

  return res.json({
    "code" : "200"
  })
};


module.exports = {
    'initialize': (app, options) => {
        app.get('/api/ordercomplete', doUpdate);
    }
};
