/*
！！！！！！！「このプログラムには、Moment.jsライブラリが追加されています。」！！！！！！！
*/

function doGet(e){
  var page=e.parameter["p"];
  
  if(page =="form"){
    const htmlOutput_form = HtmlService.createTemplateFromFile("form-new").evaluate().setTitle('教室利用申請フォーム').setFaviconUrl("https://drive.google.com/uc?id=1AwUkQKd51JH6eKWWwCPnYuONa8mqQ14X&.png").setSandboxMode(HtmlService.SandboxMode.IFRAME).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
    return htmlOutput_form;
  }else{ 
    const htmlOutput_error = HtmlService.createTemplateFromFile("error").evaluate().setTitle('教室利用申請フォーム').setFaviconUrl("https://drive.google.com/uc?id=1AwUkQKd51JH6eKWWwCPnYuONa8mqQ14X&.png").setSandboxMode(HtmlService.SandboxMode.IFRAME).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
    return htmlOutput_error;
  }
}




function doPost(postdata){
    //シート全体
    const sheet = SpreadsheetApp.getActiveSpreadsheet();
    
    //予約状況シート
    const Main = sheet.getSheetByName('予約状況');
    //フォーム回答シート
    var Answer = sheet.getSheetByName('フォーム回答');
    var AnswerLr = Answer.getLastRow();/*最後の行を取得*/
    
    
    
    //フォームから送られてくる内容
    
    //タイムスタンプ
    var time = new Date();
    
    //メールアドレス
    var getEmail = Session.getEffectiveUser().getEmail();
    
    //名前
    var name = postdata.parameters.name;
    var stringName = String(name);
    
    //利用する日
    var When = postdata.parameters.when.toString();
    var getDay = Utilities.formatDate(new Date(When),"JST","yyyy/MM/dd");//When(利用する日)の形式をyyyy/MM/ddにする
    
    //利用したい教室
    var classroom = postdata.parameters.classroom;
    var stringClassroom = String(classroom);
    
    //チェックが入ってる場合は、教室全体も予約
    var classroomAll = postdata.parameters.alltrue;
    var stringClassroomAll = String(classroomAll);
    
    //利用目的
    var purpose = postdata.parameters.purpose;
    var stringPurpose = String(purpose);
    if(stringPurpose === "Game"){
      var stringPurposeSet = "ゲーム";
    }else if(stringPurpose === "MTG"){
      var stringPurposeSet = "イベントMTG";
    }else if(stringPurpose === "Other"){
      var stringPurposeSet = "その他";
    }
    
    //利用目的がその他の場合
    var purposeOthertext = postdata.parameters.othertext;
    var stringPurposeOthertext = String(purposeOthertext);
    
    //予約表の入力内容
    var BG = "#f4cccc";
    var FC = "#111111";
    var Info = stringName +"\n"+ stringPurposeSet;//名前＋利用目的
    var InfoOther = stringName +"\n"+ stringPurposeOthertext;//名前＋利用目的(その他)
    
    
    //教室番号割当
    if(stringClassroom == "Apple教室モニターA(前)"){
      var classSet = 1;
    }else if(stringClassroom == "Apple教室モニターB(後)"){
      var classSet = 2;
    }else if(stringClassroom == "Boeing教室全体"){
      var classSet = 3;
    }else if(stringClassroom == "Boeing教室モニターのみ"){
      var classSet = 4;
    }else if(stringClassroom == "Cisco教室全体"){
      var classSet = 5;
    }else if(stringClassroom == "Cisco教室モニターのみ"){
      var classSet = 6;
    }
    
    //名前＋利用目的
    var Info = stringName +"\n"+ stringPurposeSet;
    //名前＋利用目的(その他)
    var InfoOther = stringName +"\n"+ stringPurposeOthertext;
    
    //Return_HTML
    const htmlOutput_from_COMPL = HtmlService.createTemplateFromFile("form-COMPL").evaluate().setTitle('教室利用申請フォーム').setFaviconUrl("https://drive.google.com/uc?id=1AwUkQKd51JH6eKWWwCPnYuONa8mqQ14X&.png").setSandboxMode(HtmlService.SandboxMode.IFRAME).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
    const htmlOutput_from_Error = HtmlService.createTemplateFromFile("form-Error").evaluate().setTitle('教室利用申請フォーム').setFaviconUrl("https://drive.google.com/uc?id=1AwUkQKd51JH6eKWWwCPnYuONa8mqQ14X&.png").setSandboxMode(HtmlService.SandboxMode.IFRAME).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
    
    //フォーム回答のログ書き込み
    
  
  
    //予約表から予約セルを検索する
    
    //予約表を2次元配列化する。
    const RsvData = Main.getRange(3,2,11,6).getValues();
    
    //日付行(RsvData[i][0])から予約日(getDay)を検索
    loop:
    for(var i=1;i<=10;i++){
      console.log("------------------------");
      console.log("i="+i);
      var RsvDATE = Utilities.formatDate(RsvData[i][0],"JST","yyyy/MM/dd");//予約表の日付を(JST,yyyy/MM/dd)形式で取得
      var cell = Main.getRange(i+3,classSet+2);//予約する日の教室セルを取得
      console.log("cell="+cell.getA1Notation());
      
      //教室が既に予約済み
      if(RsvDATE == getDay && !(cell.isBlank())){
        //予約済みの教室ごとのHTML
        if(stringClassroom === "Apple教室モニターA(前)"){
          const htmlOutput_from_RAMA = HtmlService.createTemplateFromFile("form-RESE-AMoniA").evaluate().setTitle('エラー:教室利用申請フォーム').setFaviconUrl("https://drive.google.com/uc?id=1AwUkQKd51JH6eKWWwCPnYuONa8mqQ14X&.png").setSandboxMode(HtmlService.SandboxMode.IFRAME).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
          return htmlOutput_from_RAMA
          
          break
        }
        
        if(stringClassroom === "Apple教室モニターB(後)"){
          const htmlOutput_from_RAMB = HtmlService.createTemplateFromFile("form-RESE-AMoniB").evaluate().setTitle('エラー:教室利用申請フォーム').setFaviconUrl("https://drive.google.com/uc?id=1AwUkQKd51JH6eKWWwCPnYuONa8mqQ14X&.png").setSandboxMode(HtmlService.SandboxMode.IFRAME).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
          return htmlOutput_from_RAMB
          
          break
        }
        
        if(stringClassroom === "Boeing教室全体"){
          const htmlOutput_from_RBA = HtmlService.createTemplateFromFile("form-RESE-BAll").evaluate().setTitle('エラー:教室利用申請フォーム').setFaviconUrl("https://drive.google.com/uc?id=1AwUkQKd51JH6eKWWwCPnYuONa8mqQ14X&.png").setSandboxMode(HtmlService.SandboxMode.IFRAME).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
          return htmlOutput_from_RBA
          
          break
        }
        
        if(stringClassroom === "Boeing教室モニターのみ"){
          const htmlOutput_from_RBM = HtmlService.createTemplateFromFile("form-RESE-BMoni").evaluate().setTitle('エラー:教室利用申請フォーム').setFaviconUrl("https://drive.google.com/uc?id=1AwUkQKd51JH6eKWWwCPnYuONa8mqQ14X&.png").setSandboxMode(HtmlService.SandboxMode.IFRAME).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
          return htmlOutput_from_RBM
          
          break
        } 
        
        if(stringClassroom === "Cisco教室全体"){
          const htmlOutput_from_RCA = HtmlService.createTemplateFromFile("form-RESE-CAll").evaluate().setTitle('エラー:教室利用申請フォーム').setFaviconUrl("https://drive.google.com/uc?id=1AwUkQKd51JH6eKWWwCPnYuONa8mqQ14X&.png").setSandboxMode(HtmlService.SandboxMode.IFRAME).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
          return htmlOutput_from_RCA
          
          break
        }
        
        if(stringClassroom === "Cisco教室モニターのみ"){
          const htmlOutput_from_RCM = HtmlService.createTemplateFromFile("form-RESE-CMoni").evaluate().setTitle('エラー:教室利用申請フォーム').setFaviconUrl("https://drive.google.com/uc?id=1AwUkQKd51JH6eKWWwCPnYuONa8mqQ14X&.png").setSandboxMode(HtmlService.SandboxMode.IFRAME).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
          return htmlOutput_from_RCM
          
          break
        }
      }
      
      //日付(RsvDATE)==予約日(getDay) && cellの値=isBlank
      if(RsvDATE == getDay && cell.isBlank()){
        
        //利用目的が「その他」の場合
        if(stringPurpose == "Other"){
          //1-Apple教室の場合
          if(stringClassroom === "Apple教室モニターA(前)" || stringClassroom === "Apple教室モニターB(後)"){
            console.log("---A教室モニターA(前)・B(後)を予約実行---");
            //予約を実行
            Main.getRange(i+3,classSet+2).setBackground(BG).setFontColor(FC).setValue(InfoOther);
            Answer.appendRow([time,getEmail,stringName,When,stringClassroom,stringPurposeSet,stringPurposeOthertext]);//フォーム回答のログ書き込み
            
            return htmlOutput_from_COMPL;
            break
          }
          
          //2-Boeing教室全体 or Cisco教室全体の場合
          if(stringClassroom === "Boeing教室全体" || stringClassroom === "Cisco教室全体"){
            var checkBC_Moni = Main.getRange(i+3,classSet+3);
            console.log("checkBC_Moni="+checkBC_Moni.getA1Notation());
            console.log("-B・C教室全体-");
            
            //Boeing or Cisco教室モニターが予約済
            if(!(checkBC_Moni.isBlank())){
              //Boeing or Cisco教室モニターが既に予約済みの通知HTML
              console.log("-B・Cモニターが予約済み-");
              
              break
            }
            
            //Boeing or Cisco教室モニターが空き
            if(checkBC_Moni.isBlank()){
              console.log("---B・C教室全体を予約実行---");
              //予約を実行
              Main.getRange(i+3,classSet+2).setBackground(BG).setFontColor(FC).setValue(InfoOther);
              Answer.appendRow([time,getEmail,stringName,When,stringClassroom,stringPurposeSet,stringPurposeOthertext]);//フォーム回答のログ書き込み
              //「BまたはC教室モニター」予約不可にする
              checkBC_Moni.setBackground(BG).setFontColor(FC).setValue("←←←←←←←\n予約済み");
              
              return htmlOutput_from_COMPL;
              break
            }
          }
          
          //3-Boeing教室モニター or Cisco教室モニターの場合
          if(stringClassroom === "Boeing教室モニターのみ" || stringClassroom === "Cisco教室モニターのみ"){
            var checkBC_all = Main.getRange(i+3,classSet+1);
            console.log("-B・C教室モニター-");
            
            //Boeing or Cisco教室全体が予約済
            if(!(checkBC_all.isBlank())){
              //Boeing or Cisco教室全体が既に予約済みの通知HTML
              console.log("-B・C教室全体が予約済み-");
              if(stringClassroom === "Boeing教室モニターのみ"){
                const htmlOutput_from_SBA = HtmlService.createTemplateFromFile("form-SameBAll").evaluate().setTitle('エラー:教室利用申請フォーム').setFaviconUrl("https://drive.google.com/uc?id=1AwUkQKd51JH6eKWWwCPnYuONa8mqQ14X&.png").setSandboxMode(HtmlService.SandboxMode.IFRAME).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
                return htmlOutput_from_SBA
                break
              }
              
              if(stringClassroom === "Cisco教室モニターのみ"){
                const htmlOutput_from_SCA = HtmlService.createTemplateFromFile("form-SameCAll").evaluate().setTitle('エラー:教室利用申請フォーム').setFaviconUrl("https://drive.google.com/uc?id=1AwUkQKd51JH6eKWWwCPnYuONa8mqQ14X&.png").setSandboxMode(HtmlService.SandboxMode.IFRAME).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
                return htmlOutput_from_SCA
                break
              }
            }
            
            //Boeing or Cisco教室全体が空き
            if(checkBC_all.isBlank()){
              console.log("---B・C教室モニターを予約実行---");
              //予約を実行
              Main.getRange(i+3,classSet+2).setBackground(BG).setFontColor(FC).setValue(InfoOther);
              Answer.appendRow([time,getEmail,stringName,When,stringClassroom,stringPurposeSet,stringPurposeOthertext]);//フォーム回答のログ書き込み
              //教室全体の予約を許可しない場合
              if(!(stringClassroomAll === "true")){
                console.log("-B・C教室全体を予約許可しない-");
                checkBC_all.setBackground(BG).setFontColor(FC).setValue("→→→→→→→\n予約済み");//「BまたはC教室全体」予約不可にする
              }
              
              return htmlOutput_from_COMPL;
              break
            }
          }
          
          
        }else{
          
          
          //利用目的が「ゲーム」or「イベントMTG」の場合
          
          //1-Apple教室の場合
          if(stringClassroom === "Apple教室モニターA(前)" || stringClassroom === "Apple教室モニターB(後)"){
            console.log("---A教室モニターA(前)・B(後)を予約実行---");
            //予約を実行
            Main.getRange(i+3,classSet+2).setBackground(BG).setFontColor(FC).setValue(Info);
            Answer.appendRow([time,getEmail,stringName,When,stringClassroom,stringPurposeSet]);//フォーム回答のログ書き込み
            
            return htmlOutput_from_COMPL;
            break
          }
          
          //2-Boeing教室全体 or Cisco教室全体の場合
          if(stringClassroom === "Boeing教室全体" || stringClassroom === "Cisco教室全体"){
            var checkBC_Moni = Main.getRange(i+3,classSet+3);
            console.log("checkBC_Moni="+checkBC_Moni.getA1Notation());
            console.log("-B・C教室全体-");
            
            //Boeing or Cisco教室モニターが予約済
            if(!(checkBC_Moni.isBlank())){
              //Boeing or Cisco教室モニターが既に予約済みの通知HTML
              console.log("-B・Cモニターが予約済み-");
              
              break
            }
            
            //Boeing or Cisco教室モニターが空き
            if(checkBC_Moni.isBlank()){
              console.log("---B・C教室全体を予約実行---");
              //予約を実行
              Main.getRange(i+3,classSet+2).setBackground(BG).setFontColor(FC).setValue(Info);
              Answer.appendRow([time,getEmail,stringName,When,stringClassroom,stringPurposeSet]);//フォーム回答のログ書き込み
              //「BまたはC教室モニター」予約不可にする
              checkBC_Moni.setBackground(BG).setFontColor(FC).setValue("←←←←←←←\n予約済み");
              
              return htmlOutput_from_COMPL;
              break
            }
          }
          
          //3-Boeing教室モニター or Cisco教室モニターの場合
          if(stringClassroom === "Boeing教室モニターのみ" || stringClassroom === "Cisco教室モニターのみ"){
            var checkBC_all = Main.getRange(i+3,classSet+1);
            console.log("-B・C教室モニター-");
            
            //Boeing or Cisco教室全体が予約済
            if(!(checkBC_all.isBlank())){
              //Boeing or Cisco教室全体が既に予約済みの通知HTML
              console.log("-B・C教室全体が予約済み-");
              
              break
            }
            
            //Boeing or Cisco教室全体が空き
            if(checkBC_all.isBlank()){
              console.log("---B・C教室モニターを予約実行---");
              //予約を実行
              Main.getRange(i+3,classSet+2).setBackground(BG).setFontColor(FC).setValue(Info);
              Answer.appendRow([time,getEmail,stringName,When,stringClassroom,stringPurposeSet]);//フォーム回答のログ書き込み
              //教室全体の予約を許可しない場合
              if(!(stringClassroomAll === "true")){
                console.log("-B・C教室全体を予約許可しない-");
                checkBC_all.setBackground(BG).setFontColor(FC).setValue("→→→→→→→\n予約済み");//「BまたはC教室全体」予約不可にする
              }
              
              return htmlOutput_from_COMPL;
              break
            }
          }
          break loop;
        }
      }
    }
}