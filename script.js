let arranged = false;

window.addEventListener("load", () => {
    setTimeout(() => {
        const warning = document.getElementById("warningContainer");
        warning.style.opacity = "1";
        warning.style.pointerEvents = "all";
        warning.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
        // warning.style.transition = "opacity 0.4s ease";
    }, 4000)
})

document.addEventListener("DOMContentLoaded", () => {
    const structure = document.getElementById("structure");
    const topics = structure.querySelectorAll(".topics:not(#downContainer .topics)");

    topics.forEach(topic => {
        const structureRect = structure.getBoundingClientRect();
        const topicsRect = topic.getBoundingClientRect();

        const offset = structureRect.left - topicsRect.left;
        topic.offsetWidth;

        topic.style.transform = `translateX(${offset}px)`;
    })
})

function arrangeItem() {
    const structure = document.getElementById("structure");

    const topics = structure.querySelectorAll('.topics:not(#downContainer .topics)');
    const hlines = document.querySelectorAll('.Hline');
    const vlines = document.querySelectorAll('.Vline');
    const container = document.getElementById("downContainer");
    const downTopics = container.querySelectorAll(".topics");

    const fixedDelay = 1000;  // Fixed delay for each transition
    let delay = 0;

    function waitForTransition(element, callback) {
        element.addEventListener('transitionend', callback, { once: true });
    }

    for (let i = 0; i < topics.length; i++) {
        const topic = topics[i];
        const hline = hlines[i];

        setTimeout(() => {
            topic.style.transform = ''; 
            topic.classList.add("after");

            waitForTransition(topic, () => {
                if (hline) {
                    hline.classList.add("after");
                    waitForTransition(hline, () => {
                    });
                }
            });

        }, delay);
        delay += fixedDelay;
    }

    vlines.forEach((element, i) => {
        setTimeout(() => {
            element.classList.add("after");
            waitForTransition(element, () => {
            });
        }, delay);
        delay += fixedDelay; 
    });

    setTimeout(() => {
        container.classList.add("after");
    }, delay);
    delay += fixedDelay;

    downTopics.forEach((element, i) => {
        element.classList.add("after");
    })

    setTimeout(() => {
        console.log("arranged");
        arranged = true;
    }, delay);
}

document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener("click", () => {
        const warningContainer = document.getElementById("warningContainer");
        const warning = document.getElementById("warning");
        const warningText = document.getElementById("warningText");
        const inputContainer = document.getElementById("input");
        const finalNode = inputContainer.cloneNode(true);
        if (btn.id == "yes") {
            inputContainer.remove();
            warningText.innerHTML = "Completing the website...."
            warningContainer.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
            warningContainer.style.backdropFilter = "blur(0px";
            warning.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
            // console.log(arranged);
            setTimeout(() => {
                warning.style.transform = "translate(-50%, -50%) scale(0.5)";
                warning.style.transition = "transform 0.3s ease, left 0.3s ease";
                setTimeout(()=> {
                    warning.style.left = "8%";
                    arrangeItem();
                }, 500);
            }, 2000);
            const interval = setInterval(() => {
                if (arranged == true) {
                    warningContainer.style.backdropFilter = "blur(3px)";
                    warning.style.left = "50%";
                    setTimeout(() => {
                        warning.style.transform = "translate(-50%, -50%) scale(1)";
                        warning.style.transition = "transform 0.3s ease, left 0.3s ease";
                        warningContainer.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
                        warning.style.backgroundColor = "rgba(51, 51, 51, 1)";
                    }, 500)
                    setTimeout(() => {
                        warningText.innerHTML = "Arrangement Completed Successfully."
                        warning.appendChild(finalNode);
                        while (finalNode.firstChild) {
                            finalNode.removeChild(finalNode.firstChild);
                        }
                        const button = document.createElement("button")
                        button.id = "done";
                        button.classList.add("btn");
                        button.textContent = "Close"
                        finalNode.appendChild(button);

                        button.addEventListener("click", () =>{
                            console.log("click");
                            warningContainer.style.opacity = 0;
                            warningContainer.style.backdropFilter = "blure(0)";
                            warningContainer.style.pointerEvents = "none";
                        })
                    }, 300);
                    clearInterval(interval);
                }
            }, 200);

        }
        else if (btn.id == "no") {
            inputContainer.remove();
            warningText.innerHTML = "Leaving The Page as it is.";

            setTimeout(() => {
                warningContainer.style.backgroundColor = "rgba(255,255,255,0)";
                warningContainer.style.pointerEvents = "none";
                warningContainer.style.opacity = 0;
            }, 2000);
        }
    })
})