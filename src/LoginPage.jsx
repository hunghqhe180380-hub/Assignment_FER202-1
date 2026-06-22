import { Row } from "react-bootstrap"
import Footer from "./layout/Footer"
import Header from "./layout/Header"

const LoginPage = () => {
    return (
        <>
            {/* Header */}
            <Header></Header>

            {/* Login Form */}
            <div className="min-vh-100
            d-flex justify-content-center align-items-center">
                <div className="w-25 border container px-4 py-4 fw-bold"
                    style={
                        {
                            height: "400px"
                        }
                    }>
                    <h2 className="text-center">Sign In</h2>
                    <Row className="mt-4">
                        <label className="px-0">Email</label>
                        <input type="text" className="form-control"
                            placeholder="Example@gmail.com"></input>
                    </Row>
                    <Row className="mt-4">
                        <label className="px-0">Password</label>
                        <input type="text" className="form-control"
                            placeholder="Enter your password..."></input>
                    </Row>
                    <Row>

                    </Row>
                </div>
            </div >

            {/* Footer */}
            < Footer ></Footer >
        </>
    )
}

export default LoginPage