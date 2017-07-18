require 'open-uri'
require 'i18n'
require 'sinatra'

class HelloLamppostWebsite < Sinatra::Base

  configure do
    I18n.load_path = Dir[File.join(settings.root, 'config', 'locales', '*.yml')]
    I18n.default_locale = :kz
    I18n.backend.load_translations
  end

  helpers do

    def link_html_class(path)
      request.path_info.start_with?(path) ? 'current' : ''
    end

    def locale_path(path)
      return "/#{I18n.locale}#{path}"
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

  before /.*/ do

    matches = request.path_info.match(/\A\/(kz|ru|en)(.*)/)

    if matches
      I18n.locale       = matches[1]
      request.path_info = matches[2]
    else
      redirect to('/kz' + request.path_info)
    end
  end

  get '/' do
    @page_title = I18n.t(:home_title)
    erb :index
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