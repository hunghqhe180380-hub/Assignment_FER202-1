import Body from "./layout/Body"
import Footer from "./layout/Footer"
import Header from "./layout/Header"

const HomePage = ({ navigate }) => {
    return (
        <div>
            <Header></Header>
            <Body
                navigate={navigate}></Body>
            <Footer></Footer>
        </div>
    )
}

export default HomePage