{
  "targets": [
    {
      "target_name": "sleep",
      "sources": ["sleep.cpp"],
      "cflags!": ["-fno-exceptions"],
      "cflags_cc!": ["-fno-exceptions"]
    }
  ]
}