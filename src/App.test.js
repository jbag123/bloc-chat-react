import React from "react"
import ReactDOM from "react-dom"
import App from "./App"

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

// @ponicode
describe("setRoom", () => {
    let inst

    beforeEach(() => {
        inst = new App.default()
    })

    test("0", () => {
        let callFunction = () => {
            inst.setRoom("Credit Card Account")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            inst.setRoom("Investment Account")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            inst.setRoom("Checking Account")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            inst.setRoom("Home Loan Account")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            inst.setRoom(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("setUser", () => {
    let inst

    beforeEach(() => {
        inst = new App.default()
    })

    test("0", () => {
        let callFunction = () => {
            inst.setUser(123)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            inst.setUser("user-name")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            inst.setUser("user name")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            inst.setUser("username")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            inst.setUser("user123")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            inst.setUser(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
