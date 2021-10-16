import React, { useState } from "react";
import { useParams } from "react-router";
import { createSuggestionDocument } from "../firebase/user";
import { useSession } from "../firebase/UserProvider";
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';

function About(){
    const { user } = useSession();
    const { isAdmin } = useSession();
    const params = useParams();
    const { register, setValue, handleSubmit, reset } = useForm();
    const [isLoading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        try {
          setLoading(true);
          await createSuggestionDocument({ uid: 'MeqXVGfIq8XOBeQqFNnXtT3WNlw1', ...data });
          toast.success('We appreciate your suggestion!', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
          reset();
          // history.push(`/twishlist/${user.uid}`);
        } catch (error) {
          toast.error(error, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        } finally {
          setLoading(false);
        }
      };


    const formClassname = `ui big form twelve wide column ${isLoading ? 'loading' : ''}`;
    return(
        <div>
            <div className="about-section">
                <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className="inner-container">
                <h1>About Us</h1>
                <p class="text">
                A study conducted by OnePoll, in conjunction with Evite, looked into the birthday celebration habits of 2,000 Americans and found that as many as 35 percent of people have had their significant other forget their birthday.
            This is where Twish comes into play, a web application that enables people to send automatic celebratory wishes. Including customized messages ready to be sent.
            
                </p>
                <div className="skills">
                    <span>Web Design</span>
                    <span>Coding</span>
                </div>
            </div>
            {user && !isAdmin && (
            <form className={formClassname} onSubmit={handleSubmit(onSubmit)}>
                <div className="ui form">
                <div>
                    <textarea
                    placeholder="Do you have any suggestions for improving our overall product?"
                    type="text" 
                    name="message"
                    required 
                    ref={register}
                    />
                </div>
                </div>
                <button type="submit" className="ui submit large grey button right floated"
                >
                Submit
                </button>
            </form>
            )}
        </div>
    </div>
    
    )
}

export default About;