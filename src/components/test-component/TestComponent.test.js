import React from 'react'
import { shallow } from 'enzyme'
import Blog from './TestComponent'

describe.only('<Blog />', () => {
  it('renders content', () => {
    const blog = {
      title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
      author: 'Seppo Kolehmainen',
      likes: 5
    }
    
    const mockHandler = jest.fn()


    const blogComponent = shallow(<Blog blog={blog} onClick={mockHandler}/>)
    const contentDiv = blogComponent.find('.content')
    const likeDiv = blogComponent.find('.likeDiv')
    expect(contentDiv.text()).toContain(`${blog.title} ${blog.author}`)
    expect(likeDiv.text()).toContain(`blog has ${blog.likes} likes`)
  })
  it('clicked twice', () => {
    const blog = {
      title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
      author: 'Seppo Kolehmainen',
      likes: 5
    }
    const mockHandler = jest.fn()

    const blogComponent = shallow(<Blog blog={blog} onClick={mockHandler}/>)
    const button = blogComponent.find('button')
    button.simulate('click')
    button.simulate('click')
    expect(mockHandler.mock.calls.length).toBe(2)

  })

})