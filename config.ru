require 'sprockets'
require 'sass'
require 'uglifier'
require_relative 'app'

sproket_environment = Sprockets::Environment.new
sproket_environment.append_path 'assets/stylesheets'
sproket_environment.append_path 'assets/javascripts'
sproket_environment.css_compressor = :scss
sproket_environment.js_compressor  = :uglify

map '/assets' do
  run sproket_environment
end

use Rack::Deflater

run HelloLamppostWebsite