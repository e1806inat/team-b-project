import './Calender.css';
import React, { useState } from 'react';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ja from 'date-fns/locale/ja';
import {format} from 'date-fns';
registerLocale('ja', ja);



function Calender() {

  const [selectedDate, setSelectedDate] = useState(new Date())
  const [isOpen, setIsOpen] = useState(false);
  const handleChange = (e) => {
    setIsOpen(!isOpen);
    setSelectedDate(e);
  };

  const handleClick = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

 /* const handleChangeDateRange  = (value) => {
    if(value === "nextDay"){
      setSelectedDate=(selectedDate().Date);
      console.log(selectedDate);
    }
    else{
      setSelectedDate=(selectedDate().Date);
    }
  }*/
  

  return(
    <div>
      <div className="changeDate">
      <div className="BtnSet">
          {/*<button onClick={() => setSelectedDate(selectedDate) }>
            ＜
          </button>*/}
          <button  className='CalenderButton' onClick={handleClick}>
            {format(selectedDate, "MM月dd日")}
          </button>
          {/*<button onClick={() => setSelectedDate(selectedDate().Date +1)}>
            ＞
          </button>*/}
      </div>

        {isOpen && (
          <DatePicker 
            className={Calender}
            locale="ja"
            selected={selectedDate} 
            onChange={handleChange} 
            todayButton="今日"
            inline
          />
        )}
      </div>
          {/*<div>
            <Games Date={selectedDate} />
        </div>*/}
    </div>
  );
}
export default Calender;
