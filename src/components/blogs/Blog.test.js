import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe.only('<Blog />', () => {
  it('after clicking name the details are displayed', () => {

    const user = {
        id:'123',
        name: 'Jaska Jokunen'
    }
    
    const blog = {
      title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
      author: 'Seppo Kolehmainen',
      likes: 5,
      user: user
    }
    
    const mockHandler = jest.fn()

    const blogComponent = shallow(<Blog 
        blog={blog} 
        user={user} 
        deleteBlog={mockHandler}
        likeBlog={mockHandler}/>)
    const compactDiv = blogComponent.find('.compactDiv')
    expect(blogComponent.text()).toContain(compactDiv.text())
    expect(blogComponent.exists('.likeButton')).toEqual(false)


    compactDiv.simulate('click')

    const extendedDiv = blogComponent.find('.extendedDiv')
    const likeButton = blogComponent.find('.likeButton')
    const adderText = blogComponent.find('.adderText')
    expect(blogComponent.text()).toContain(adderText.text())
    expect(blogComponent.text()).toContain(likeButton.text())
    expect(blogComponent.exists('.likeButton')).toEqual(true)

  })

})