import './Option2.css'

export const Option = () => {



    return (

        <div className="Options">

            <div id="navArea">
                <nav>
                    <div class="inner">
                        <ul>
                            <li><a href="#">Home</a></li>
                            <li><a href="#">Detail</a></li>
                            <li><a href="#">Contact</a></li>
                        </ul>
                    </div>
                </nav>

                <div class="toggleBtn">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                <div id="mask"></div>

                <main>
                    <h1>menu bar</h1>
                </main>
            </div>


            <script src="./menuBar.js"></script>


        </div>

    )

}

export default Option;