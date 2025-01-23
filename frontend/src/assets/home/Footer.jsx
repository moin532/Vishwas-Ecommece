import React from 'react'
import styled from 'styled-components'

const Footer = () => {
  return (
   <Wrapper>
      <footer class="bg-gray-800 text-white py-10">
    <div class="container mx-auto px-4">
      <div class="flex flex-wrap justify-between">
       
        <div class="w-full sm:w-1/2 md:w-1/4 mb-6">
          <h3 class="text-lg font-bold mb-2">About Us</h3>
          <p class="text-gray-400">We are a leading e-commerce company providing a wide range of products to customers worldwide.</p>
        </div>
    
        <div class="w-full sm:w-1/2 md:w-1/4  mb-8  pl-8">
          <h3 class="text-lg font-bold mb-2">Quick Links</h3>
          <ul>
            <li><a href="#" class="text-gray-400 hover:text-white">Home</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white">Shop</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white">Contact Us</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white">About Us</a></li>
          </ul>
        </div>
        
        <div class="w-full sm:w-1/2 md:w-1/4 mb-6">
          <h3 class="text-lg font-bold mb-2">Customer Service</h3>
          <ul>
            <li><a href="#" class="text-gray-400 hover:text-white">FAQ</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white">Returns</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white">Shipping</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white">Privacy Policy</a></li>
          </ul>
        </div>
       
        <div class="w-full sm:w-1/2 md:w-1/4 mb-6">
          <h3 class="text-lg font-bold mb-2">Subscribe</h3>
          <form>
            <input type="email" class="w-full p-2 mb-2 text-gray-900" placeholder="Enter your email"/>
            <button type="submit" class="w-full bg-blue-500 hover:bg-blue-600 text-white p-2">Subscribe</button>
          </form>
        </div>
      </div>
      <div class="mt-8 text-center text-gray-400">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
        <div class="flex justify-center mt-4 space-x-4">
          <a href="#" class="text-gray-400 hover:text-white"><i class="fab fa-facebook-f"></i></a>
          <a href="#" class="text-gray-400 hover:text-white"><i class="fab fa-twitter"></i></a>
          <a href="#" class="text-gray-400 hover:text-white"><i class="fab fa-instagram"></i></a>
          <a href="#" class="text-gray-400 hover:text-white"><i class="fab fa-linkedin-in"></i></a>
        </div>
      </div>
    </div>
  </footer>
      
   </Wrapper>
  )
}


const Wrapper =styled.section`
    
#container{
    height: 25vh;
    background-color: #2a2727;
}

`

export default Footer
