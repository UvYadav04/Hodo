import React from 'react'
import Navbar from '../Components/Navbar'
export default function Privacy() {
    return (
        <><Navbar/>
            <div className='privacy'>
                <p id="main">Privacy Policy for Hodo.com</p>
                <p id="thin">Last updated: [18-02-2024]</p>
                <p class="subheading">1. Introduction</p>
                <p>Welcome to Hodo.com. This Privacy Policy explains how we collect, use, disclose, and
                    protect your personal information when you use our website.</p>
                <p class="subheading">2. Information We collect</p>
                <div>
                    <p class="subheading">2.1 personal Information</p>
                    <p>We may collect the following personal information when you use our website:</p>
                    <ul>
                        <li class="listitem">Name</li>
                        <li class="listitem">Address</li>
                        <li class="listitem">Username</li>
                        <li class="listitem">  class = "listitem"Contact Information</li>
                    </ul>
                    <p class="subheading">2.2 Usage Information</p>
                    <p>We may also collect non-personal information about your interactions with our
                        website, such as IP addresses, browser detailslocation, and device information.
                    </p>
                </div>
                <p class="subheading">3. Use of Information</p>
                <p>We use the collected information for the following purposes:</p>
                <ul>
                    <li class="listitem">Facilitating social interaction with other users
                    </li>
                    <li class="listitem">Personalizing your experience</li>
                    <li class="listitem">Communicating with you</li>
                </ul>
                <p>4. Cookies and Similar Technologies</p>
                <p>We do not use cookies or similar technologies on our website.</p>
                <p class="subheading">5. Data Storage
                </p>
                <p>We store user data in MongoDB for improved data management and security</p>
                <p class="subheading">6. Third-Party Disclosures</p>
                <p>We may share the user's name and username with third parties for the purpose of
                    social interaction, but we do not sell or trade any other personal information without
                    your consent.</p>
                <p class="subheading">7. Opt-Out and Deletion</p>
                <p>You can opt-out of receiving promotional communications and request the deletion
                    of your account through account settings.</p>
                <p class="subheading">8. Age Restriction</p>
                <p>Our website does not have age restrictions. Users of all ages are welcome to use our
                    services.
                </p>
                <p class="subheading">9. Compliance with Laws</p>
                <p>We do not have specific compliance requirements with data protection laws.</p>
                <p class="subheading">10. Changes to this Privacy Policy
                </p>
                <p>We may update this Privacy Policy from time to time. The latest version will be
                    posted on this page.</p>
                <p class="subheading">11. Contact Us</p>
                <p>If you have any questions about this Privacy Policy, please contact us at [provide
                    contact information].</p>
                <p>By using our website, you agree to the terms outlined in this Privacy Policy</p>
            </div>
        </>
    )
}
