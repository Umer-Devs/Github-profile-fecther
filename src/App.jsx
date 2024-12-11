import { useState } from 'react'
import { FaGithub, FaSearch, FaMapMarkerAlt, FaBuilding, FaLink, FaTwitter } from 'react-icons/fa'

function App() {
  const [username, setUsername] = useState('')
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchGithubUser = async () => {
    if (!username) return
    
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(`https://api.github.com/users/${username}`)
      if (!response.ok) throw new Error('User not found')
      const data = await response.json()
      setUserData(data)
    } catch (err) {
      setError('User not found')
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchGithubUser()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <FaGithub className="text-6xl text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">GitHub Profile Explorer</h1>
          <p className="text-gray-300 text-lg">Discover GitHub profiles in style</p>
        </div>

        <div className="relative max-w-xl mx-auto mb-12">
          <div className="flex items-center bg-white rounded-full shadow-lg overflow-hidden p-1">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter GitHub username..."
              className="flex-1 px-6 py-3 text-gray-700 focus:outline-none text-lg"
            />
            <button
              onClick={fetchGithubUser}
              className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300 flex items-center"
            >
              <FaSearch className="mr-2" />
              Search
            </button>
          </div>
        </div>

        {loading && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          </div>
        )}

        {error && (
          <div className="text-center text-red-400 bg-red-900/50 p-6 rounded-xl backdrop-blur-sm">
            <p className="text-xl">{error}</p>
          </div>
        )}

        {userData && (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl">
            <div className="md:flex">
              <div className="md:w-1/3 p-8 text-center">
                <img
                  src={userData.avatar_url}
                  alt={userData.login}
                  className="w-48 h-48 rounded-full mx-auto ring-4 ring-blue-500/30"
                />
                <h2 className="text-2xl font-bold text-white mt-4">{userData.name}</h2>
                <p className="text-blue-400">@{userData.login}</p>
                <div className="mt-4">
                  <a
                    href={userData.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300"
                  >
                    View Profile
                  </a>
                </div>
              </div>

              <div className="md:w-2/3 p-8 bg-white/5">
                {userData.bio && (
                  <p className="text-gray-300 text-lg mb-6">{userData.bio}</p>
                )}

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-white/5 p-4 rounded-xl text-center">
                    <div className="text-3xl font-bold text-blue-400">{userData.followers}</div>
                    <div className="text-gray-400">Followers</div>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl text-center">
                    <div className="text-3xl font-bold text-blue-400">{userData.following}</div>
                    <div className="text-gray-400">Following</div>
                  </div>
                </div>

                <div className="space-y-4">
                  {userData.location && (
                    <div className="flex items-center text-gray-300">
                      <FaMapMarkerAlt className="mr-2 text-blue-400" />
                      {userData.location}
                    </div>
                  )}
                  {userData.company && (
                    <div className="flex items-center text-gray-300">
                      <FaBuilding className="mr-2 text-blue-400" />
                      {userData.company}
                    </div>
                  )}
                  {userData.blog && (
                    <div className="flex items-center text-gray-300">
                      <FaLink className="mr-2 text-blue-400" />
                      <a href={userData.blog} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                        {userData.blog}
                      </a>
                    </div>
                  )}
                  {userData.twitter_username && (
                    <div className="flex items-center text-gray-300">
                      <FaTwitter className="mr-2 text-blue-400" />
                      <a href={`https://twitter.com/${userData.twitter_username}`} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                        @{userData.twitter_username}
                      </a>
                    </div>
                  )}
                </div>

                <div className="mt-6 bg-white/5 p-4 rounded-xl">
                  <div className="text-gray-300">
                    <span className="text-blue-400 font-medium">Public Repositories:</span> {userData.public_repos}
                  </div>
                  <div className="text-gray-300">
                    <span className="text-blue-400 font-medium">Joined GitHub:</span> {new Date(userData.created_at).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
