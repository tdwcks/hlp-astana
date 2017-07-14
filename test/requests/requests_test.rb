require_relative '../test_helper'

class RequestsTest < Test::Unit::TestCase
  include Rack::Test::Methods

  def test_home_page
    assert_get_in_each_language '/'
  end

  def test_about_page
    assert_get_in_each_language '/about'
  end

  def test_how_to_play_page
    assert_get_in_each_language '/how-to-play'
  end

  private

  def assert_get_in_each_language(path)

    ['en', 'jp'].each do |language|
      get '/en' + path
      assert last_response.ok?
    end

  end

end