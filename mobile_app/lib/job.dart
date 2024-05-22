class Job {
  final String jobId;
  final String title;
  // final DateTime publicationDate;
  final String location;
  final String company;
  final String url;
  final String source;

  const Job({
    required this.jobId,
    required this.title,
    // required this.publicationDate,
    required this.location,
    required this.company,
    required this.url,
    required this.source,
  });

  factory Job.fromJson(Map<String, dynamic> json) {
    return switch (json) {
      {
        'jobId': String jobId,
        'title': String title,
        // 'publicationDate': DateTime publicationDate,
        'location': String location,
        'company': String company,
        'url': String url,
        'source': String source,
      } =>
        Job(
          jobId: jobId,
          title: title,
          // publicationDate: publicationDate,
          location: location,
          company: company,
          url: url,
          source: source,
        ),
      _ => throw const FormatException('Failed to load job.'),
    };
  }
}
