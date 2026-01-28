import React from 'react'

const Section1 = () => {
    return (
        <section>
            <div class="board">
                <div class="column">
                    <div class="column-header">
                      <p>TODO</p>
                        <p>Count</p>
                    </div>
                    <div class="column-body"></div>
                </div>

                <div class="column">
                    <div class="column-header">
                        <p>Progress</p>
                        <p>Count</p>
                    </div>
                    <div class="column-body"></div>
                </div>

                <div class="column">
                    <div class="column-header">
                        <p>Done</p>
                        <p>Count</p>
                    </div>
                    <div class="column-body"></div>
                </div>
            </div>
        </section>

    )
}

export default Section1
