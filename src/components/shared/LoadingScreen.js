import Spinner from 'react-bootstrap/Spinner'

const LoadingScreen = () => (
    <div style={{textAlign: 'center'}}>
        <Spinner role="status" animation="border">
            <span className="visually-hidden">Warping in...</span>
        </Spinner>
    </div>
)

export default LoadingScreen