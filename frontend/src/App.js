import './App.css';
import Main from './Components/Main';

function App() {
  return (
    <div className="App">
      <div className="phone-view">
        <h1>Optimized for Mobile Experience</h1>
        <p>Enjoy a seamless and responsive design tailored for your smartphone.</p>

        <div className="features">
          <div className="feature">
            <h2>📱 Smooth Navigation</h2>
            <p>Effortlessly browse with a touch-friendly interface.</p>
          </div>
          <div className="feature">
            <h2>⚡ Fast Performance</h2>
            <p>Optimized for speed and efficiency on mobile devices.</p>
          </div>
          <div className="feature">
            <h2>🎨 Clean UI</h2>
            <p>A minimalist and user-friendly design for a great experience.</p>
          </div>
        </div>
      </div>

      <div className="content-view">
        <Main />
      </div>
    </div>


  );
}

export default App;
