
import GradualBlur from '../src/components/GradualBlur';
function App() {
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Gradual Blur Demo</h1>
      <section style={{position: 'relative',height: 500,overflow: 'hidden'}}>
  <div style={{ height: '100%',overflowY: 'auto',padding: '6rem 2rem' }}>
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy1rINDrhBb5H4T527Bq4wPtLru1I8N_6A_S25IdQ2vA&s=10"></img>
  </div>

  <GradualBlur
    target="parent"
    position="bottom"
    height="6rem"
    strength={2}
    divCount={5}
    curve="bezier"
    exponential={true}
    opacity={1}
  />
</section>
    </div>
  );
}

export default App;
