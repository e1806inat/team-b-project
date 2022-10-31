import React from 'react';
import SwipeableViews from 'react-swipeable-views';

const styles = {
    slide: {
      padding: 50,
      minHeight: 300,
      color: '#fff',
    },
    slide1: {
      background: '#Bce2e8',
    },
    slide2: {
      background: '#B3DC4A',
    },
    slide3: {
      background: '#797979',
    },
};

export const swipe = () => {
    return (
        <SwipeableViews enableMouseEvents>
            <div style={Object.assign({}, styles.slide, styles.slide1)}>
            テスト1<br></br>
            <img src="https://picsum.photos/id/1041/1200/640" alt="スライダー画像1"></img>
            </div>
            <div style={Object.assign({}, styles.slide, styles.slide2)}>
            テスト2
            </div>
            <div style={Object.assign({}, styles.slide, styles.slide3)}>
            テスト3
            </div>
        </SwipeableViews>
    )
}
  
export default swipe