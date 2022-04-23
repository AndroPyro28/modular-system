import React from 'react'
import Carousel from '../../components/Carosel/Carousel'
import './home.css'
function Home() {
    return (
        <div className="home__container">
            <Carousel />
            <section className="welcome__container">
                <h1>Bulacan Polytechnic College</h1>

                <p> Equip Students with the necessary technological & intellectual
                    capacity to face fast changing demands of modern Technology.
                </p>
            </section>

            <section className="content">
                <div className="content__image__container">
                    <img className="content__image" src="/img/bpcInfo.jpg" />
                </div>
                <div className="content__paragraph__container">
                    <h1>What we have?</h1>
                    <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla quae at repellat ea autem obcaecati praesentium culpa deleniti natus assumenda, cupiditate voluptatem perferendis ullam, vero quisquam, dicta id blanditiis hic modi ipsam neque tempora. Fuga explicabo et deserunt aut, accusamus vitae. Magni expedita placeat sed, nihil reiciendis cupiditate est fuga? </p>
                </div>
            </section>

            <section className="content">
                
                <div className="content__paragraph__container pading__right">
                    <h1>We value Learnings</h1>
                    <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla quae at repellat ea autem obcaecati praesentium culpa deleniti natus assumenda, cupiditate voluptatem perferendis ullam, vero quisquam, dicta id blanditiis hic modi ipsam neque tempora. Fuga explicabo et deserunt aut, accusamus vitae. Magni expedita placeat sed, nihil reiciendis cupiditate est fuga? </p>
                </div>

                <div className="content__image__container">
                    <img className="content__image" src="/img/we_are_happy.jpg" />
                </div>
            </section>
        </div>
    )
}

export default Home
