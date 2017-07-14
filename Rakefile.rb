task :default => [:test]

desc "Run all the tests"
task :test do
  Dir.glob('test/**/*_test.rb') { |f| require_relative f }
end