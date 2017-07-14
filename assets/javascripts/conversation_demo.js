
var ConversationDemo = function() {

  if ('classList' in document.createElement('div')) {

    this.api_url = ''
    this.question_element = document.getElementById('question-bubble')
    this.answer_element = document.getElementById('answer-bubble')
    this.new_question_button = document.getElementById('new-question-button')
    this.next_answer_button = document.getElementById('next-answer-button')


    this.random_question = {}
    this.current_answer_position = null

    this.new_question_button.classList.remove('hidden')
    this.next_answer_button.classList.remove('hidden')

    this.new_question_button.addEventListener('click', this.requestNewRandomQuestion.bind(this))
    this.next_answer_button.addEventListener('click', this.displayNextAnswer.bind(this))

    this.requestNewRandomQuestion()

  }

}


ConversationDemo.prototype.requestNewRandomQuestion = function() {

  this.request = new XMLHttpRequest();
  this.request.addEventListener('load', this.receiveNewRandomQuestion.bind(this), false)

  this.new_question_button.setAttribute('disabled', 'disabled')
  this.next_answer_button.setAttribute('disabled', 'disabled')

  this.request.open('get', this.api_url + '/questions/random?time' + Date.now())
  this.request.send()

}

ConversationDemo.prototype.receiveNewRandomQuestion = function(event) {

  this.random_question = JSON.parse(this.request.responseText)
  this.current_answer_position = null;
  this.displayNewQuestion()
}

ConversationDemo.prototype.displayNewQuestion = function() {
  this.question_element.classList.add('off')

  var question_element = this.question_element;
  var question_text = this.question_element.getElementsByClassName('text')[0]

  question_text.textContent = this.random_question.question.text.en

  this.new_question_button.removeAttribute('disabled')
  this.displayNextAnswer()

  if ('transition' in question_element.style) {
    setTimeout(function() {
      question_element.classList.remove('off')
    }, 600)
  } else {
    this.question_element.classList.remove('off')
  }

};

ConversationDemo.prototype.displayNextAnswer = function() {

  if (this.current_answer_position == null || this.current_answer_position == (this.random_question.responses.length -1)) {
    this.current_answer_position = 0
  } else {
    this.current_answer_position += 1
  }

  this.next_answer_button.setAttribute('disabled', 'disabled')

  var next_answer_button = this.next_answer_button
  var answer_element = this.answer_element;
  var answer_element_text = this.answer_element.getElementsByClassName('text')[0]
  var object_link = this.answer_element.getElementsByClassName('object-ref')[0]
  var new_answer = this.random_question.responses[this.current_answer_position]

  next_answer_button.removeAttribute('disabled')

  var _this = this;

  if ('transition' in answer_element.style) {

    this.answer_element.classList.add('off')
    setTimeout(function() {
      _this.updateAnswer(new_answer)
      answer_element.classList.remove('off')
    }, 600)
  } else {

    answer_element.classList.remove('off')
    _this.updateAnswer(new_answer)
  }
};

ConversationDemo.prototype.updateAnswer = function(answer) {

  var object_link = this.answer_element.getElementsByClassName('object-ref')[0]
  var answer_element_text = this.answer_element.getElementsByClassName('text')[0]
  
  answer_element_text.textContent = answer.text;
  if (answer.street_object.name) { 
    object_link.textContent = answer.street_object.name.en + ' #' + answer.street_object.code 
  } else { 
    object_link.textcontent = answer.street_object.type + ' #' + answer.street_object.code; 
  }

}