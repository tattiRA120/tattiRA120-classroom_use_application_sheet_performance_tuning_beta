function AutoChange(){
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var Main = sheet.getSheetByName('予約状況');
  var Log = sheet.getSheetByName('ログ用');
  var BG = "#c9daf8"
  var FC = "#111111"
  var FirstWeekRng = Main.getRange("C4:G8");/* "予約状況"シートの"C4:G8"のセル範囲を取得 */
  var SecondWeekRng = Main.getRange("C9:G13");/* "予約状況"シートの"C9:G13"のセル範囲を取得 */
  var cellDate = Main.getRange("B4").getValue();/* "予約状況"シートの"B4"セルを取得 */
  
  /* ログを保存 */
  var LogLr = Log.getLastRow();/* 最後の行を取得 */
  var LData = Log.getRange(1,1,LogLr,1)/* "ログ用"シートの日付行を取得する */
  var LValues = LData.getValues();/* 単体セルの値を取得する */
  // ログの保存セルの検索とコピぺ
  for (var i = 3; i <= LogLr; i++) {
    var LDates = Utilities.formatDate(new Date(LValues[i]),"JST","yyyy/MM/dd");/* "ログ用"シートの日付列、日付をi行のセルを取得する */
    var CData = Utilities.formatDate(new Date(cellDate),"JST","yyyy/MM/dd");/* "予約状況"シートの"A4"セルの日付を取得する */
    // "ログ用”シートの日付行のセル と "予約状況"シートのA4セルの日付 がイコールで true
    if(LDates == CData){
      var LogPaste = Log.getRange(i+1,2);/* 「ログ用」シートに貼り付けるセルを取得 */
      FirstWeekRng.moveTo(LogPaste);/* 1週間目のセル範囲をコピー「ログ用」のシートに貼り付け */
      
      break;
    }
  }
  
  /* 2週間目の予約セル範囲を1週間目範囲セルにコピペ */
  SecondWeekRng.moveTo(FirstWeekRng);
  
  /* セルをリセット */
  var Info = '';
  // そのセル範囲にある値のみクリア＆背景色＆文字色変更＆セル枠線
  SecondWeekRng.clearContent().setBackground(BG).setFontColor(FC).setBorder(true, true, true, true, true, true).setValue(Info);
  
  /* B4セルの日付を変更する */
  var Today = Utilities.formatDate(new Date(),"JST","yyyy/MM/dd");/* 実行時の日付を取得 */
  var DayToday = Utilities.formatDate(new Date(),"JST","E");/* 実行時の曜日を取得 */
  
  /* "予約状況"シートの"B4"セルを取得 */
  var MainMonDate = Main.getRange("B4");
  // 実行時の曜日が月曜日ならtrue
  if(DayToday == "Mon"){
    MainMonDate.setFontColor(FC).setValue(Today);/* "予約状況"シートの"A4"セルに実行日の日付を入力 */
  }
}