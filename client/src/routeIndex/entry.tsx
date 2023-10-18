import React from 'react'
import ReactDOM from 'react-dom/client'
import "./App.css"
import LandingPage from './landingPage.tsx'

if ((globalThis as any).template_data === undefined) {
  // (globalThis as any).template_data = {
  //   showLogin: false,
  //   showModal: true,
  //   signup_error: "User email already exists!",
  //   signupform: {
  //     confirmPassword: "yash123",
  //     csrf_token: "ImU2Njg2ODJkNGI4ZWU5ZjA3M2Q5NDJkYzhhNTNjZjVlZTcyY2Q5ZGQi.ZQwKnw.y6ckIwTtudHa8QiYs5lxU-xlyh8",
  //     email: "pat.yash333@gmail.com",
  //     name: "Haha",
  //     password: "yash123"
  //   },
  //   status: "23505"
  // }


  // (globalThis as any).template_data = {
  //   showLogin: true,
  //   showModal: true,
  //   login_error: "Invalid login Credentials!",
  //   loginform: {
  //     csrf_token: "ImU2Njg2ODJkNGI4ZWU5ZjA3M2Q5NDJkYzhhNTNjZjVlZTcyY2Q5ZGQi.ZQwKnw.y6ckIwTtudHa8QiYs5lxU-xlyh8",
  //     email: "test@gmail.com",
  //     password: "yash123"
  //   },
  //   status: "400"
  // }

  (globalThis as any).template_data = JSON.stringify({
    "result": "No data from server",
  });

  console.log("Mock data:", (globalThis as any).template_data)
}
else {
    console.log("Received date from server:", (globalThis as any).template_data)
}


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LandingPage />
  </React.StrictMode>,
)

