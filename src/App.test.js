import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/blogs/Blog'
jest.mock('./services/blogs')

import blogService from './services/blogs'

describe('<App />', () => {
    
  
    describe('when user is not logged', () => {
        let app
      beforeEach(() => {
        // luo sovellus siten, että käyttäjä ei ole kirjautuneena
            app = mount(<App/>)
      })
  
      it('only login form is rendered', () => {
        app.update()
        const blogComponents = app.find(Blog)
        expect(blogComponents.length).toEqual(0)
      })
    })
  
    describe.only('when user is logged', () => {
        let app
      beforeEach(() => {
        // luo sovellus siten, että käyttäjä on kirjautuneena
        const user = {
            "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRlbW8iLCJpZCI6IjViOWZmNTgwNjI1NTYxMTliYWYzMzQ5ZiIsImlhdCI6MTUzNzI5NDg3M30.uNHf1U_S3Xuwge3L_trQWhBqA7NUdOk72TGwtkARtYo",
            "username":"demo",
            "name":"Tester testerr"
        }
        window.localStorage.setItem("loggedUser", JSON.stringify(user))
        app = mount(<App/>)
        

            
      })
  
      it('all notes are rendered', () => {
        app.update()
        
        const blogComponents = app.find(Blog)
        expect(blogComponents.length).toEqual(blogService.blogs.length)
      })
    })
  })