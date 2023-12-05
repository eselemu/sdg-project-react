import React from "react";

import './IndexMain.css';
//Simple frontend component that works as introduction to our webpage
function IndexMain() {
    return (
        <div className="container mainContainer indexContainer">
            <h2>Welcome to our health and wellness site</h2>
            <p>This page is dedicated to health and well-being through proper nutrition. Here you will find valuable
                information on how to lead a healthy lifestyle, promoting dietary practices that benefit your health and
                contribute to the achievement of Sustainable Development Goals. Our mission is to provide resources and
                knowledge that assist you in making informed decisions about your nutrition and well-being. Together, we
                will work to address the challenges of malnutrition and promote a healthy life for all.</p>

            <h2>What is an SDG? (Sustainable Development Goals)</h2>
            <p>The Sustainable Development Goals (SDGs) are a set of 17 global objectives adopted by all United Nations
                Member States in 2015. These goals were designed to address a wide range of global challenges, from
                eradicating poverty to combating climate change. Each of the SDGs focuses on key areas of sustainable
                development, and the third one, "Health and Well-being" (SDG3), is essential for the well-being of
                communities and global progress.</p>
            <img className="imgIndex" src={process.env.PUBLIC_URL + "imgs/index/Pregunta.png"} alt="Pregunta" />

            <h2>Food Health and the SDGs</h2>
            <p>Within the framework of the Sustainable Development Goals, food health plays a crucial role. SDG 3 focuses on
                "Ensuring healthy lives and promoting well-being for all at all ages." This includes access to nutritious
                and safe food, as well as the promotion of healthy dietary practices to prevent diseases and improve the
                quality of life.</p>
            <img className="imgIndex" src={process.env.PUBLIC_URL + "imgs/index/Bienestar.png"} alt="Bienestar" />

            <h2>Problem Statement</h2>
            <p>Despite advancements in health and nutrition awareness, many communities around the world continue to face
                challenges in terms of access to healthy foods, knowledge about balanced nutrition, and the fight against
                diet-related diseases. Malnutrition, whether due to excess or deficiency, remains a significant problem in
                many regions.</p>
            <img className="imgIndex" src={process.env.PUBLIC_URL + "imgs/index/Problematica.png"} alt="Problematica" />

            <h2>Our Mission and Vision</h2>
            <p>Mission: Our mission is to promote health and well-being through education and the promotion of healthy
                dietary practices. We strive to provide accurate information and useful resources that help individuals make
                informed decisions about their nutrition and lifestyle.</p>

            <p>Vision: Our vision is a world in which all people have access to nutritious and healthy food, and where
                health and well-being are a priority for everyone. We aim to contribute to the achievement of SDG 3, working
                together to attain a healthy life and promote well-being.
            </p>
            <img className="imgIndex" src={process.env.PUBLIC_URL + "imgs/index/Salud.png"} alt="Salud" />

            <h2>Some Healthy Recipes</h2>
            <p>Here are some healthy and easy-to-prepare recipes that promote good nutrition.</p>
            <ul>
                <li>
                    <h3>Chicken, Avocado, and Quinoa Salad</h3>
                    <p><strong>Ingredients:</strong></p>
                    <ul>
                        <li>Grilled chicken breast</li>
                        <li>1 cup cooked quinoa</li>
                        <li>1 ripe avocado, diced</li>
                        <li>1 cup cherry tomatoes, halved</li>
                        <li>1/2 cup sweet corn (canned is fine)</li>
                        <li>1/4 cup fresh cilantro, chopped</li>
                        <li>Juice of 1 lemon</li>
                        <li>2 tablespoons olive oil</li>
                        <li>Salt and pepper to taste</li>
                    </ul>
                    <p><strong>Instructions:</strong></p>
                    <ol>
                        <li>Cook quinoa according to package instructions and let it cool.</li>
                        <li>Cut the chicken breast into pieces and grill until fully cooked. Then, slice it into strips.
                        </li>
                        <li>In a large bowl, combine cooked quinoa, grilled chicken, avocado, cherry tomatoes, corn, and
                            cilantro.
                        </li>
                        <li>In a small bowl, mix lemon juice, olive oil, salt, and pepper.</li>
                        <li>Pour the dressing over the salad and gently toss to combine all the ingredients.</li>
                        <li>Serve the salad on individual plates and enjoy.</li>
                    </ol>
                </li>
                <li>
                    <h3>Fruit and Spinach Smoothie</h3>
                    <p><strong>Ingredients:</strong></p>
                    <ul>
                        <li>1 ripe banana</li>
                        <li>1 cup fresh spinach leaves</li>
                        <li>1/2 cup frozen strawberries</li>
                        <li>1/2 cup fresh pineapple chunks</li>
                        <li>1/2 cup fat-free Greek yogurt</li>
                        <li>1/2 cup almond milk (or your choice of milk)</li>
                        <li>1 tablespoon honey (optional)</li>
                        <li>Ice (optional)</li>
                    </ul>
                    <p><strong>Instructions:</strong></p>
                    <ol>
                        <li>Place all ingredients in a blender.</li>
                        <li>Blend at high speed until the mixture is smooth and creamy.</li>
                        <li>If you prefer it colder, add ice and blend again.</li>
                        <li>Taste the smoothie and if you desire a sweeter touch, add a tablespoon of honey and blend once
                            more.
                        </li>
                        <li>Serve in a tall glass and enjoy this healthy and refreshing drink.</li>
                    </ol>
                </li>
            </ul>

            <h2>Links and Additional Resources</h2>
            <p>For more information on health and nutrition, please refer to resources from reputable health organizations
                such as
                the World Health Organization (WHO) and the Centers for Disease Control and Prevention (CDC).</p>
            <ul>
                <li>
                    <a href="https://www.who.int/es/news-room/fact-sheets/detail/healthy-diet">
                        <strong>World Health Organization (WHO) - Fact Sheet on Healthy Diet</strong>
                    </a>
                    <p>Get additional information about a healthy diet on the WHO website.</p>
                </li>
                <li>
                    <a href="https://www.cdc.gov/nutrition/resources-publications/spanish/beneficios-de-comer-saludable.html">
                        <strong>Centers for Disease Control and Prevention (CDC) - Benefits of Eating Healthy</strong>
                    </a>
                    <p>Learn about the benefits of maintaining a healthy diet on the CDC website.</p>
                </li>
            </ul>
            <p>You can also visit our forum and other pages located in the search bar.</p>
        </div>
    );
}

export default IndexMain;