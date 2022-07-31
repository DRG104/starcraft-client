import UnitsIndex from "./units/UnitsIndex"

const Home = (props) => {
	// const { msgAlert, user } = props
	// console.log('props in home', props)

	const { msgAlert } = props

	return (
		<div>
			<h2 
				style={{
					textAlign: 'center',
				}}
			>
				Ki Nala Atum
			</h2>
			<UnitsIndex msgAlert={ msgAlert } />
		</div>
	)
}

export default Home
