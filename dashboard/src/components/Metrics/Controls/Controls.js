import React from "react";
import $ from "jquery";

function Controls() {
  const handleClick = (e) => {
    $(e.target).toggleClass("btn-controls-white btn-controls-primary");
  };

  return (
    <div>
      {/* EMOTIONS */}
      <div>
        <h5>Emotions</h5>
        <div className="btn-group" role="group" aria-label="Basic example">
          <button
            onClick={handleClick}
            type="button"
            className="border btn btn-controls-white"
          >
            Eye Pupil
          </button>
          <button
            onClick={handleClick}
            type="button"
            className="border btn btn-controls-white"
          >
            Eye Gaze
          </button>
          <button
            onClick={handleClick}
            type="button"
            className="border btn btn-controls-white"
          >
            Smile
          </button>
          <button
            onClick={handleClick}
            type="button"
            className="border btn btn-controls-white"
          >
            Attention
          </button>
          <br />
          <button
            onClick={handleClick}
            type="button"
            className="border btn btn-controls-white"
          >
            Happiness
          </button>
        </div>
      </div>

      <br />
      <br />
      {/* Metrics */}
      <div>
        <h5>Metrics</h5>
        <div className="btn-group" role="group" aria-label="Basic example">
          <button
            onClick={handleClick}
            type="button"
            className="border btn btn-controls-white"
          >
            % of People
          </button>
          <button
            onClick={handleClick}
            type="button"
            className="border btn btn-controls-white"
          >
            Average
          </button>
          <button
            onClick={handleClick}
            type="button"
            className="border btn btn-controls-white"
          >
            Max
          </button>
          <button
            onClick={handleClick}
            type="button"
            className="border btn btn-controls-white"
          >
            EmotionalAll
          </button>
        </div>
      </div>

      <br />
      <br />
      {/* Gender */}
      <div>
        <h5>Gender</h5>
        <div className="btn-group" role="group" aria-label="Basic example">
          <button
            onClick={handleClick}
            type="button"
            className="border btn btn-controls-white"
          >
            Sum
          </button>
          <button
            onClick={handleClick}
            type="button"
            className="border btn btn-controls-white"
          >
            Comapre
          </button>
          <button
            onClick={handleClick}
            type="button"
            className="border btn btn-controls-white"
          >
            Male
          </button>
          <button
            onClick={handleClick}
            type="button"
            className="border btn btn-controls-white"
          >
            Female
          </button>
        </div>
      </div>
    </div>
  );
}

export default Controls;
