import React from 'react';
import _JSXStyle from 'styled-jsx/style';
import Navigation from '../components/nav';

export default () => {
  return (
    <div>
      <style jsx global>{`
      @import url('https://fonts.googleapis.com/css?family=Blinker&display=swap');
      @import url('https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css');
      body {
        font-family: 'Blinker', sans-serif;
      }
    `}</style>
    <Navigation></Navigation>
    </div>
  )

}