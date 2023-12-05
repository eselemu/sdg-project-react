import React from "react";

import './VideoGameMain.css'

//Simple front end component that showcases and explains the future videogame still in development
function VideoGameMain() {
    return (
        <div className="container containerVisual mainVideoGame">
            <h1>Videogame</h1>
            <div className="row">
                <div className="col-md-6">
                    <img src={process.env.PUBLIC_URL + "imgs/videogame/Videojuego1.jpeg"} alt="Videojuego1" className="img-fluid" />
                </div>
                <div className="col-md-6">
                    <img src={process.env.PUBLIC_URL + "./imgs/videogame/Videojuego2.jpeg"} alt="Videojuego2" className="img-fluid" />
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <h2>Maze of Nutrition</h2>
                    <p>
                        This video game was developed with the primary goal of educating and encouraging children to adopt a healthy diet in a
                        fun and engaging manner. It is designed to be both entertaining and thought-provoking, providing an immersive experience
                        that not only captures a child's attention but also stimulates their cognitive abilities.

                        In this interactive game, children embark on exciting adventures where they must make choices about the food they
                        consume. By offering them the opportunity to make decisions and solve challenges related to nutrition, we empower them
                        to become more conscious of their dietary choices and develop healthy eating habits from an early age.

                        Through captivating visuals, engaging storylines, and interactive gameplay, the game fosters an environment where
                        learning about nutrition becomes an enjoyable experience. It's not just about teaching kids to eat their vegetables;
                        it's about instilling a lifelong appreciation for the importance of a balanced diet and the impact it has on their
                        overall well-being.

                        Our vision is to make learning about nutrition an integral part of a child's growth, seamlessly blending education and
                        entertainment to promote a healthier lifestyle. By incorporating elements of fun and critical thinking, we aim to shape
                        a generation of kids who not only have a blast while playing our game but also make informed and nutritious choices when
                        it comes to their meals. With this video game, we are turning the path to a healthier future into an exciting and
                        engaging journey for kids.
                    </p>
                </div>
                <div className="col-md-6">
                    <h2>Gameplay</h2>
                    <p>
                        In this video game, you find yourself navigating a complex labyrinth, and your primary objective is to embark on a
                        thrilling quest for various ingredients scattered throughout this intricate maze. Your mission becomes an exciting
                        adventure, as you must carefully explore each twist and turn to collect these essential components.

                        As you successfully gather these ingredients, you'll not only advance in the game but also uncover a unique, nutritious
                        recipe that can promote a healthier lifestyle. These recipes are thoughtfully designed to encourage players to develop
                        their culinary skills and make better dietary choices. Ultimately, the game aims to inspire players to not only conquer
                        the maze but also embrace the joy of preparing and enjoying wholesome meals, making it an enjoyable and educational
                        experience. So, as you progress in the game, you'll be rewarded not only with in-game achievements but also with
                        valuable knowledge on how to maintain a balanced and healthy diet.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default VideoGameMain;