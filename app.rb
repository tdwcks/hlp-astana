require 'open-uri'
require 'sinatra'

class HelloLamppostWebsite < Sinatra::Base

  helpers do

    def link_html_class(path)
      request.path_info.start_with?(path) ? 'current' : ''
    end

    def code_parser(code)

      code = code.to_s

      words = code.split(/\s+/)

      if words.length >= 2
        {
          object_type: (words[0..-2].join('_').downcase),
          object_code: words[-1].gsub("#", '')
        }
      else
        nil
      end

    end

  end

  get '/questions/random' do
    cache_control :public, max_age: 0
    url = "http://hello-lamp-post-api.herokuapp.com/questions/random?location_id=1&except=292&locale=en"
    open(url).read
  end

  get '/' do
    @page_title = "Hello Lamp Post London"
    erb :index
  end

end