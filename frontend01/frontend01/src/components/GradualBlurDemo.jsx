import GradualBlur from 'react-bits/es/animations/GradualBlur';
import './GradualBlurDemo.css';

export default function GradualBlurDemo() {
  return (
    <div className="blur-container">
      <GradualBlur blurAmount={20} duration={1000}>
        <img
          src="https://source.unsplash.com/random/800x600"
          alt="Demo"
          className="blur-image"
        />
      </GradualBlur>
    </div>
  );
}
