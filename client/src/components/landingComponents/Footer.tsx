import { Key } from 'react'
import gitlogo from '../../assets/github.svg';

// The list of links to add to the footer in [text, route] pairs
const routes = [  
    ['Github', 'https://github.com/The-Syntax-Sorcerers/ava', gitlogo],
    // ['Privacy Policy', '/privacy_policy', null],
]

// Allows adding link elements to the footer
function FooterLinkElement({route}: {route: any[]}) {
    const title = route[0];
    const url = route[1];
    const logo = route[2];

    return (
        <li className="list-none">
            <div className="flex justify-center items-center -ml-3 mr-1">
                <p className='ml-1'>| &nbsp;</p>
                <a href={url} className="pr-3 py-2 hover:text-button-pink">
                    {logo ? <img className='w-5 h-5' src={logo} /> : title}
                    <title></title>
                </a>
            </div>
        </li>
    )
}

// A footer containing copyright information and a list of link elements
export default function Footer() {
    return (// bg-button-light-blue bg-indigo-100
        <footer className="container flex items-center justify-center text-sm font-medium custom-footer">
            <div className="flex justify-center items-center">
                <div className="mx-4 my-4">
                    <p className="text-center">Made with ❤️</p>
                    {/* <p className="text-center"> © The-Syntax-Sorcerers 2023 </p> */}
                </div>
                <div className="flex justify-center items-center">
                    {routes.map((route, key: Key) => (
                        <FooterLinkElement route={route} key={key} />
                    ))}
                </div>
            </div>
        </footer>
    )
}