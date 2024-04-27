//import React from 'react'
import { Footer } from 'flowbite-react';
import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from 'react-icons/bs';
const MyFooter = () => {
    return (
        <Footer bgDark>
            <div className="w-full px-4 lg:px-24 bg-gray-300" style={{color:"black"}} >
                <div className="grid w-full grid-cols-2 gap-8 px-6 py-8 md:grid-cols-4">
                    <div>
                        <Footer.Title title="Company" />
                        <Footer.LinkGroup col>
                            <Footer.Link href="/about">About Us</Footer.Link>
                            <Footer.Link href="/shop">Shop</Footer.Link>
                            <Footer.Link href="/service">Basket</Footer.Link>
                            <Footer.Link href="/contact">review</Footer.Link>
                        </Footer.LinkGroup>
                    </div>
                    <div>
                        <Footer.Title title='Marque' />
                        <Footer.LinkGroup col>
                            <Footer.Link href="/shop">Robe</Footer.Link>
                            <Footer.Link href="/shop">Ensembe</Footer.Link>
                            <Footer.Link href="/shop">Abaya</Footer.Link>
                        </Footer.LinkGroup>


                    </div>
                    <div>
                        <Footer.Title title="Contact us" />
                        <Footer.LinkGroup col>
                            <Footer.Link >+216 22 222 222</Footer.Link>
                            <Footer.Link >FORHER@FORHER.tn</Footer.Link>
                        </Footer.LinkGroup>

                    </div>
                    <div>
                        <Footer.Title title="Address" />
                        <Footer.LinkGroup col>
                            <Footer.Link >Nabeul, Tunisia</Footer.Link>

                        </Footer.LinkGroup>
                    </div>


                </div>
                <div className="w-full bg-gray-200 px-4 py-6 sm:flex sm:items-center sm:justify-between">
                    <Footer.Copyright href="#" by=" FOR HER Shop" year={2024} />
                    <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
                        <Footer.Icon href="https://www.facebook.com/zeineb.aissa.169" icon={BsFacebook} />
                        <Footer.Icon href="#" icon={BsInstagram} />
                        <Footer.Icon href="#" icon={BsTwitter} />
                        <Footer.Icon href="" icon={BsLinkedin} />
                    </div>
                </div>
            </div>
        </Footer>
    )
}

export default MyFooter
